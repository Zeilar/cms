import { CreateFieldDto } from "../../common/validators/field/CreateFieldDto";
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
}
