import { Knex } from "knex";
import { primaryKey } from "../util/primaryKey";
import { Tables } from "../tables";
import { timestamps } from "../util/timestamps";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.createTable(Tables.REGISTER_TOKENS, table => {
		primaryKey(table, knex);
		table.string("email").notNullable().unique();
		table.string("token").notNullable().unique();
		table.timestamp("expires_at").notNullable();
		timestamps(table, knex);
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.dropTable("register_tokens");
}
