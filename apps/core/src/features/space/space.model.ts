/* eslint-disable @typescript-eslint/no-var-requires */

import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { ContentType } from "../content-type/content-type.model";

export class Space extends Model {
	public readonly id: string;
	public readonly name: string;
	public contentTypes?: ContentType[];

	public static tableName = Tables.SPACES;

	public static relationMappings = {
		contentTypes: {
			relation: Model.HasManyRelation,
			modelClass: require("../content-type/content-type.model").ContentType,
			join: {
				from: `${this.tableName}.id`,
				to: `${Tables.CONTENT_TYPES}.spaceId`,
			},
		},
	};
}
