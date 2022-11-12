/* eslint-disable @typescript-eslint/no-var-requires */

import { FieldType } from "@shared";
import { Model } from "objection";
import { Tables } from "../../core/db/tables";

export class Field extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly type: FieldType;
	public readonly contentTypeId?: string;

	public static tableName = Tables.FIELDS;

	public static relationMappings = {
		contentType: {
			relation: Model.BelongsToOneRelation,
			modelClass: require("../content-type/content-type.model").ContentType,
			join: {
				from: `${this.tableName}.contentTypeId`,
				to: `${Tables.CONTENT_TYPES}.id`,
			},
		},
	};
}
