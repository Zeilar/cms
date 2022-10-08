import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex("roles").del();
	await knex("roles").insert([{ name: "admin" }, { name: "editor" }]);
}