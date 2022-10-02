import { Model } from "objection";
import { ContentType } from "../content-type/content-type.model";

export class Space extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly contentType?: ContentType;

	public static get tableName() {
		return "spaces";
	}

	public static get relationMappings() {
		return {
			contentTypes: {
				relation: Model.HasManyRelation,
				modelClass: ContentType,
				join: {
					from: "spaces.id",
					to: "content_types.spaceId",
				},
			},
		};
	}
}
