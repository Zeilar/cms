import { Knex } from "knex";

export function primaryKey(table: Knex.CreateTableBuilder, knex: Knex<object, object[]>) {
	const PG_UUIDV4 = knex.raw("gen_random_uuid()");
	table.uuid("id", { primaryKey: true }).defaultTo(PG_UUIDV4);
}
