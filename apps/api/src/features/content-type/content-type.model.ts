import { JSONSchema, Model } from "objection";
import { Field } from "../field/field.model";
import { Space } from "../space/space.model";

export class ContentType extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly space?: Space;
	public readonly fields?: Field[];

	public static get tableName() {
		return "content_types";
	}

	public static jsonSchema: JSONSchema = {};

	public static get relationMappings() {
		return {
			space: {
				relation: Model.BelongsToOneRelation,
				modelClass: Space,
				join: {
					from: "content_types.spaceId",
					to: "spaces.id",
				},
			},
			fields: {
				relation: Model.HasManyRelation,
				modelClass: Field,
				join: {
					from: "content_types.id",
					to: "fields.contentTypeId",
				},
			},
		};
	}
}
