import { Knex } from "knex";
import { RoleValues } from "../../../../../../libs/shared/src";
import { primaryKey } from "../util/primaryKey";
import { Tables } from "../tables";
import { timestamps } from "../util/timestamps";

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.createTable(Tables.USERS, table => {
			primaryKey(table, knex);
			table.string("email").notNullable().unique();
			table.string("name").notNullable();
			table.text("password").notNullable();
			timestamps(table, knex);
		})
		.createTable(Tables.USERS_ROLES, table => {
			primaryKey(table, knex);
			table.uuid("userId").unsigned().notNullable();
			table.uuid("roleId").unsigned().notNullable();
			timestamps(table, knex);
		})
		.createTable(Tables.ROLES, table => {
			primaryKey(table, knex);
			table.enum("name", RoleValues).notNullable().unique();
			timestamps(table, knex);
		});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema
		.dropTableIfExists(Tables.USERS)
		.dropTableIfExists(Tables.USERS_ROLES)
		.dropTableIfExists(Tables.ROLES);
}
