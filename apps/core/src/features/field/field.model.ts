import { Model } from "objection";
import { ContentType } from "../content-type/content-type.model";

export class Field extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly contentType?: ContentType;

	public static tableName = "fields";

	public static relationMappings = {
		contentType: {
			relation: Model.BelongsToOneRelation,
			modelClass: ContentType,
			join: {
				from: "fields.contentTypeId",
				to: "content_types.id",
			},
		},
	};
}
