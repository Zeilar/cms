import { CreateSpaceDto } from "../../common/validators/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { Space } from "./space.model";
import { SpaceRepository } from "./space.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class SpaceService {
	public constructor(
		private readonly cacheService: CacheService,
		private readonly spaceRepository: SpaceRepository
	) {}

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
}
