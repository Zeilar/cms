import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { Role } from "../role/role.model";

export class User extends Model {
	public readonly id: string;
	public readonly email: string;
	public readonly name: string;
	public roles?: Role[];
	public password?: string;

	public static tableName = Tables.USERS;

	public static relationMappings = {
		roles: {
			relation: Model.ManyToManyRelation,
			modelClass: Role,
			join: {
				from: `${this.tableName}.id`,
				through: {
					from: `${Tables.USERS_ROLES}.userId`,
					to: `${Tables.USERS_ROLES}.roleId`,
				},
				to: `${Tables.ROLES}.id`,
			},
		},
	};
}
