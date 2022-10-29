import { Knex } from "knex";
import { Role } from "../../../../../../libs/shared/src";

const roles: Record<"name", Role>[] = [{ name: Role.ADMIN }, { name: Role.EDITOR }];

export async function seed(knex: Knex): Promise<void> {
	await knex("roles").del();
	await knex("roles").insert(roles);
}
