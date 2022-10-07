import { Knex } from "knex";

export function up(knex: Knex): Knex.SchemaBuilder {
	const PG_CURRENT_TIMESTAMP = knex.raw("CURRENT_TIMESTAMP");
	const PG_UUIDV4 = knex.raw("gen_random_uuid()");
	return knex.schema
		.createTable("spaces", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").notNullable();
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("content_types", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").notNullable();
			table.uuid("spaceId").unsigned().index("spaceId").notNullable();
			table.foreign("spaceId", "spaceId").references("spaces.id").onDelete("CASCADE");
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("fields", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
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
			table.uuid("contentTypeId").unsigned().index("contentTypeId").notNullable();
			table
				.foreign("contentTypeId", "contentTypeId")
				.references("content_types.id")
				.onDelete("CASCADE");
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.dropTable("fields").dropTable("content_types").dropTable("spaces");
}
