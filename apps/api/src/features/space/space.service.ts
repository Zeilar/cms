import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { Space } from "./space.model";
import { SpaceRepository } from "./space.repository";
import type { ID } from "../../types/repository";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";

@Injectable()
export class SpaceService {
	public constructor(
		private readonly cacheService: CacheService,
		private readonly spaceRepository: SpaceRepository
	) {}

	public async exists(id: ID): Promise<boolean> {
		if (this.cacheService.has(`space-${id}`)) {
			return true;
		}
		const count = await this.spaceRepository.count();
		return count > 0;
	}

	public async create(dto: CreateSpaceDto): Promise<Space> {
		const space = await this.spaceRepository.create(dto);
		await this.cacheService.set(`space-${space.id}`, space);
		return space;
	}

	public async findById(id: ID): Promise<Space | undefined> {
		const cached = await this.cacheService.get<Space>(`space-${id}`);
		if (cached != null) {
			return cached;
		}
		return this.spaceRepository.findById(id);
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
