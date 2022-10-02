import { Knex } from "knex";

export function up(knex: Knex): Knex.SchemaBuilder {
	const PG_CURRENT_TIMESTAMP = knex.raw("CURRENT_TIMESTAMP");
	const PG_UUIDV4 = knex.raw("uuid_generate_v4()");
	return knex.schema
		.createTable("spaces", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").unique().notNullable();
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("content_types", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").unique().notNullable();
			table.uuid("spaceId").unsigned().index().notNullable();
			table.foreign("spaceId").references("spaces.id");
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("fields", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").unique().notNullable();
			table.uuid("contentTypeId").unsigned().index().notNullable();
			table.foreign("contentTypeId").references("content_types.id");
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.dropTableIfExists("fields")
		.dropTableIfExists("content_types")
		.dropViewIfExists("spaces");
}
