import { Knex } from "knex";
import { primaryKey } from "../util/primaryKey";
import { Tables } from "../tables";
import { timestamps } from "../util/timestamps";

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.createTable(Tables.SPACES, table => {
			primaryKey(table, knex);
			table.string("name").notNullable().unique();
			timestamps(table, knex);
		})
		.createTable(Tables.CONTENT_TYPES, table => {
			primaryKey(table, knex);
			table.string("name").notNullable();
			table.uuid("spaceId").notNullable();
			table.foreign("spaceId").references(`${Tables.SPACES}.id`).onDelete("CASCADE");
			timestamps(table, knex);
		})
		.createTable(Tables.FIELDS, table => {
			primaryKey(table, knex);
			table.string("name").notNullable();
			table
				.enum("type", [
					"integer",
					"decimal",
					"date",
					"rich-text",
					"text-short",
					"text-long",
					"location",
				])
				.notNullable();
			table.uuid("contentTypeId").notNullable();
			table
				.foreign("contentTypeId")
				.references(`${Tables.CONTENT_TYPES}.id`)
				.onDelete("CASCADE");
			timestamps(table, knex);
		});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.dropTable(Tables.FIELDS)
		.dropTable(Tables.CONTENT_TYPES)
		.dropTable(Tables.SPACES);
}
