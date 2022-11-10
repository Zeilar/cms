import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ContentType } from "./content-type.model";
import { ContentTypeRepository } from "./content-type.repository";
import type { ID } from "../../types/repository";
import { FieldService } from "../field/field.service";
import { SpaceService } from "../space/space.service";

@Injectable()
export class ContentTypeService {
	public constructor(
		private readonly contentTypeRepository: ContentTypeRepository,
		private readonly fieldService: FieldService,
		private readonly spaceService: SpaceService
	) {}

	public async create({ spaceName, name }: CreateContentTypeDto): Promise<ContentType> {
		const space = await this.spaceService.findByName(spaceName);
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		return this.contentTypeRepository.create(space, { name });
	}

	public async findById(id: ID, wf?: boolean): Promise<ContentType | undefined> {
		const contentType = await this.contentTypeRepository.findById(id);
		if (!contentType || !wf) {
			return contentType;
		}
		contentType.fields = await this.fieldService.getAllInContentType(contentType.id);
		return contentType;
	}

	public findBySpaceName(spaceName: string): Promise<ContentType[]> {
		return this.contentTypeRepository.findBySpaceName(spaceName);
	}
}
