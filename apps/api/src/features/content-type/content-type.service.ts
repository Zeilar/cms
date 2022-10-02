import { CreateContentTypeDto } from "../../common/validators/CreateContentTypeDto";
import { Injectable } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { ContentType } from "./content-type.model";
import { ContentTypeRepository } from "./content-type.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class ContentTypeService {
	public constructor(
		private readonly cacheService: CacheService,
		private readonly contentTypeRepository: ContentTypeRepository
	) {}

	public async create(dto: CreateContentTypeDto): Promise<ContentType> {
		const contentType = await this.contentTypeRepository.create(dto);
		await this.cacheService.set(`contentType-${contentType.id}`, contentType);
		return contentType;
	}

	public async findById(id: ID): Promise<ContentType | undefined> {
		const cached = await this.cacheService.get<ContentType>(`contentType-${id}`);
		if (cached != null) {
			return cached;
		}
		return this.contentTypeRepository.findById(id);
	}
}
