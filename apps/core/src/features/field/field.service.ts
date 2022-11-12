import { CreateFieldDto } from "../../common/validators/field/CreateFieldDto";
import { Injectable, NotFoundException, forwardRef, Inject } from "@nestjs/common";
import { Field } from "./field.model";
import { FieldRepository } from "./field.repository";
import { ContentTypeService } from "../content-type/content-type.service";

@Injectable()
export class FieldService {
	public constructor(
		private readonly fieldRepository: FieldRepository,
		@Inject(forwardRef(() => ContentTypeService))
		private readonly contentTypeService: ContentTypeService
	) {}

	public async create({ contentTypeName, name, type }: CreateFieldDto): Promise<Field> {
		const contentType = await this.contentTypeService.findByName(contentTypeName);
		if (!contentType) {
			throw new NotFoundException("Content Type not found");
		}
		return this.fieldRepository.create(contentType, { name, type });
	}

	public findByContentTypeName(spaceName: string, contentTypeName: string): Promise<Field[]> {
		return this.fieldRepository.findBySpaceName(spaceName, contentTypeName);
	}
}
