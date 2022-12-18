import { EntryStatus } from "@shared";
import { Model, ModelOptions, QueryContext } from "objection";
import { ContentDto } from "../../common/validators/entry/ContentDto";
import { Tables } from "../../core/db/tables";
import { ContentType } from "../content-type/content-type.model";

export class Entry extends Model {
	public readonly id: string;
	public readonly status: EntryStatus;
	public content: ContentDto[];
	public readonly spaceId: string;
	public readonly contentTypeId: string;

	public static tableName = Tables.ENTRIES;

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

	private async beforeInsertOrUpdate(queryContext: QueryContext): Promise<void> {
		await super.$beforeInsert(queryContext);
		// @ts-expect-error Objection does not stringify JSON for us
		this.content = JSON.stringify(this.content);
	}

	public $beforeInsert(queryContext: QueryContext): void {
		this.beforeInsertOrUpdate(queryContext);
	}

	public $beforeUpdate(_opt: ModelOptions, queryContext: QueryContext): void {
		this.beforeInsertOrUpdate(queryContext);
	}
}
