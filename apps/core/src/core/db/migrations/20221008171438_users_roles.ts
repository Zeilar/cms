import { Knex } from "knex";

export function up(knex: Knex): Knex.SchemaBuilder {
	const PG_CURRENT_TIMESTAMP = knex.raw("CURRENT_TIMESTAMP");
	const PG_UUIDV4 = knex.raw("gen_random_uuid()");
	return knex.schema
		.createTable("users", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("email").notNullable().unique();
			table.string("name").notNullable();
			table.text("password").notNullable();
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("users_roles", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.uuid("userId").unsigned().notNullable();
			table.uuid("roleId").unsigned().notNullable();
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		})
		.createTable("roles", table => {
			table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
			table.string("name").notNullable().unique();
			table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
			table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.dropTableIfExists("users")
		.dropTableIfExists("users_roles")
		.dropTableIfExists("roles");
}
