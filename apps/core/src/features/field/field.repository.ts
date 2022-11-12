import { Injectable } from "@nestjs/common";
import { Field } from "./field.model";
import type { ID } from "../../types/repository";
import { ContentType } from "../content-type/content-type.model";
import { FieldType } from "@shared";

interface CreateFieldArgs {
	name: string;
	type: FieldType;
}

@Injectable()
export class FieldRepository {
	public findById(id: ID): Promise<Field | undefined> {
		return Field.query().findById(id).execute();
	}

	public create(contentType: ContentType, { name, type }: CreateFieldArgs): Promise<Field> {
		return contentType
			.$relatedQuery("fields")
			.insertAndFetch({ name, contentTypeId: contentType.id, type })
			.execute();
	}
}
