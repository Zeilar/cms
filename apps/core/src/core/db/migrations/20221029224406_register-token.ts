import { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	const PG_CURRENT_TIMESTAMP = knex.raw("CURRENT_TIMESTAMP");
	const PG_UUIDV4 = knex.raw("gen_random_uuid()");
	return knex.schema.createTable("register_tokens", table => {
		table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
		table.string("email").notNullable().unique();
		table.string("token").notNullable().unique();
		table.timestamp("expires_at").notNullable();
		table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
		table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.dropTable("register_tokens");
}
