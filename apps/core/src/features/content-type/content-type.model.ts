import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { Field } from "../field/field.model";
import { Space } from "../space/space.model";

export class ContentType extends Model {
	public readonly id: string;
	public readonly name: string;
	public space?: Space;
	public fields?: Field[];

	public static tableName = Tables.CONTENT_TYPES;

	public static relationMappings = {
		space: {
			relation: Model.BelongsToOneRelation,
			modelClass: Space,
			join: {
				from: `${this.tableName}.spaceId`,
				to: `${Tables.SPACES}.id`,
			},
		},
		fields: {
			relation: Model.HasManyRelation,
			modelClass: Field,
			join: {
				from: `${this.tableName}.id`,
				to: `${Tables.FIELDS}.contentTypeId`,
			},
		},
	};
}
