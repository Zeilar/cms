import { CreateFieldDto } from "../../core/common/validators/field/CreateFieldDto";
import { Injectable } from "@nestjs/common";
import { Field } from "./field.model";
import { FieldRepository } from "./field.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class FieldService {
	public constructor(private readonly fieldRepository: FieldRepository) {}

	public create(dto: CreateFieldDto): Promise<Field> {
		return this.fieldRepository.create(dto);
	}

	public findById(id: ID): Promise<Field | undefined> {
		return this.fieldRepository.findById(id);
	}

	public getAllInContentType(contentTypeId: ID): Promise<Field[]> {
		return Field.query().where({ contentTypeId }).execute();
	}
}
