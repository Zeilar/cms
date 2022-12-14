/* eslint-disable @typescript-eslint/no-var-requires */

import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { Entry } from "../entry/entry.model";
import { Field } from "../field/field.model";
import { Space } from "../space/space.model";

export class ContentType extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly spaceId?: string;
	public space?: Space;
	public fields?: Field[];
	public entries?: Entry[];

	public static tableName = Tables.CONTENT_TYPES;

	public static relationMappings = {
		space: {
			relation: Model.BelongsToOneRelation,
			modelClass: require("../space/space.model").Space,
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
		entries: {
			relation: Model.HasManyRelation,
			modelClass: Entry,
			join: {
				from: `${this.tableName}.id`,
				to: `${Tables.ENTRIES}.contentTypeId`,
			},
		},
	};
}
