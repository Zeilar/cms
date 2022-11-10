import { Knex } from "knex";
import { EntryStatus, EntryStatusValues } from "../../../../../../libs/shared/src";
import { primaryKey } from "../util/primaryKey";
import { Tables } from "../tables";
import { timestamps } from "../util/timestamps";

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.createTable(Tables.ENTRIES, table => {
		primaryKey(table, knex);
		table.enum("status", EntryStatusValues).defaultTo(EntryStatus.DRAFT).notNullable();
		table.jsonb("content").notNullable(); // Schema: Record<fieldName, data >
		table.uuid("spaceId").notNullable();
		table.foreign("spaceId").references(`${Tables.SPACES}.id`).onDelete("CASCADE");
		table.uuid("contentTypeId").notNullable();
		table.foreign("contentTypeId").references(`${Tables.CONTENT_TYPES}.id`).onDelete("CASCADE");
		timestamps(table, knex);
	});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.dropTableIfExists(Tables.ENTRIES);
}
