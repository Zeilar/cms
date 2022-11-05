import { Knex } from "knex";

export function timestamps(table: Knex.CreateTableBuilder, knex: Knex<object, object[]>) {
	const PG_CURRENT_TIMESTAMP = knex.raw("CURRENT_TIMESTAMP");
	table.timestamp("created_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
	table.timestamp("updated_at").notNullable().defaultTo(PG_CURRENT_TIMESTAMP);
}
