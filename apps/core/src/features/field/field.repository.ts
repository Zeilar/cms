import { Injectable, NotFoundException } from "@nestjs/common";
import { Field } from "./field.model";
import { ContentType } from "../content-type/content-type.model";
import { FieldType } from "@shared";
import { Space } from "../space/space.model";

interface CreateFieldArgs {
	name: string;
	type: FieldType;
}

@Injectable()
export class FieldRepository {
	public create(contentType: ContentType, { name, type }: CreateFieldArgs): Promise<Field> {
		return contentType
			.$relatedQuery("fields")
			.insertAndFetch({ name, contentTypeId: contentType.id, type })
			.execute();
	}

	public async findBySpaceName(spaceName: string, contentTypeName: string): Promise<Field[]> {
		const space = await Space.query().findOne("name", spaceName);
		if (!space) {
			throw new NotFoundException("Space not found.");
		}
		const contentType = await ContentType.query()
			.where({ name: contentTypeName, spaceId: space.id })
			.first();
		if (!contentType) {
			throw new NotFoundException("Content Type not found.");
		}
		return Field.query().where({ contentTypeId: contentType.id }).execute();
	}
}
