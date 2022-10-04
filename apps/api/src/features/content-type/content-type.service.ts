import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Injectable } from "@nestjs/common";
import { ContentType } from "./content-type.model";
import { ContentTypeRepository } from "./content-type.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class ContentTypeService {
	public constructor(private readonly contentTypeRepository: ContentTypeRepository) {}

	public create(dto: CreateContentTypeDto): Promise<ContentType> {
		return this.contentTypeRepository.create(dto);
	}

	public findById(id: ID): Promise<ContentType | undefined> {
		return this.contentTypeRepository.findById(id);
	}

	public getAllInSpace(spaceId: ID): Promise<ContentType[]> {
		return this.contentTypeRepository.getAllInSpace(spaceId);
	}
}
