import { CreateFieldDto } from "../../common/validators/field/CreateFieldDto";
import { Injectable } from "@nestjs/common";
import { Field } from "./field.model";
import type { ID } from "../../types/repository";

@Injectable()
export class FieldRepository {
	public findById(id: ID): Promise<Field | undefined> {
		return Field.query().findById(id).execute();
	}

	public create(field: CreateFieldDto): Promise<Field> {
		return Field.query().insertAndFetch(field).execute();
	}
}
