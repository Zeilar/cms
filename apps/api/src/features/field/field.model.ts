import { Model } from "objection";
import { ContentType } from "../content-type/content-type.model";
import { Space } from "../space/space.model";

export class Field extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly contentType?: ContentType;

	public static get tableName() {
		return "fields";
	}

	public static get relationMappings() {
		return {
			contentType: {
				relation: Model.BelongsToOneRelation,
				modelClass: Space,
				join: {
					from: "fields.contentTypeId",
					to: "content_types.id",
				},
			},
		};
	}
}
