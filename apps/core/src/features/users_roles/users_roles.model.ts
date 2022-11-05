import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { Role } from "../role/role.model";
import { User } from "../user/user.model";

export class UsersRoles extends Model {
	public readonly id: string;
	public readonly userId: string;
	public readonly roleId: string;
	public readonly users?: User[];
	public readonly roles?: Role[];

	public static tableName = Tables.USERS_ROLES;

	public static relationMappings = {
		users: {
			relation: Model.HasManyRelation,
			modelClass: User,
			join: {
				from: `${Tables.USERS}.id`,
				to: `${this.tableName}.userId`,
			},
		},
		roles: {
			relation: Model.HasManyRelation,
			modelClass: Role,
			join: {
				from: `${Tables.ROLES}.id`,
				to: `${this.tableName}.roleId`,
			},
		},
	};
}
