import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { Space } from "./space.model";
import { SpaceRepository } from "./space.repository";
import type { ID } from "../../types/repository";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";
import { ContentTypeService } from "../content-type/content-type.service";

@Injectable()
export class SpaceService {
	public constructor(
		private readonly cacheService: CacheService,
		private readonly spaceRepository: SpaceRepository,
		private readonly contentTypeService: ContentTypeService
	) {}

	public async create(dto: CreateSpaceDto): Promise<Space> {
		const space = await this.spaceRepository.create(dto);
		await this.cacheService.set(`space-${space.id}`, space);
		return space;
	}

	public async findById(id: ID, wct?: boolean): Promise<Space | undefined> {
		const cacheKey = wct ? `space-${id}-wct` : `space-${id}`;
		const cached = await this.cacheService.get<Space>(cacheKey);
		if (cached != null) {
			return cached;
		}
		const space = await this.spaceRepository.findById(id);
		if (!space) {
			return;
		}
		space.contentTypes = await this.contentTypeService.getAllInSpace(space.id);
		return space;
	}

	public async edit(id: ID, dto: UpdateSpaceDto): Promise<Space | null> {
		const cached = await this.cacheService.get<Space>(`space-${id}`);
		if (cached == null) {
			return null;
		}
		const space = await this.spaceRepository.edit(cached.id, dto);
		await this.cacheService.set(`space-${id}`, space);
		return space;
	}

	public async destroy(id: ID): Promise<boolean> {
		await this.cacheService.delete(`space-${id}`);
		const deletions = await this.spaceRepository.destroy(id);
		return deletions > 0;
	}
}
