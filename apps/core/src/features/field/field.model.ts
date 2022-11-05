import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { ContentType } from "../content-type/content-type.model";

export class Field extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly contentType?: ContentType;

	public static tableName = Tables.FIELDS;

	public static relationMappings = {
		contentType: {
			relation: Model.BelongsToOneRelation,
			modelClass: ContentType,
			join: {
				from: `${this.tableName}.contentTypeId`,
				to: `${Tables.CONTENT_TYPES}.id`,
			},
		},
	};
}
