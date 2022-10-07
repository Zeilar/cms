import { CreateContentTypeDto } from "../../core/common/validators/content-type/CreateContentTypeDto";
import { Injectable } from "@nestjs/common";
import { ContentType } from "./content-type.model";
import { ContentTypeRepository } from "./content-type.repository";
import type { ID } from "../../types/repository";
import { FieldService } from "../field/field.service";

@Injectable()
export class ContentTypeService {
	public constructor(
		private readonly contentTypeRepository: ContentTypeRepository,
		private readonly fieldService: FieldService
	) {}

	public create(dto: CreateContentTypeDto): Promise<ContentType> {
		return this.contentTypeRepository.create(dto);
	}

	public async findById(id: ID, wf?: boolean): Promise<ContentType | undefined> {
		const contentType = await this.contentTypeRepository.findById(id);
		if (!contentType || !wf) {
			return contentType;
		}
		contentType.fields = await this.fieldService.getAllInContentType(contentType.id);
		return contentType;
	}

	public getAllInSpace(spaceId: ID): Promise<ContentType[]> {
		return this.contentTypeRepository.getAllInSpace(spaceId);
	}
}
