import { Model } from "objection";
import { Role } from "../role/role.model";
import { User } from "../user/user.model";

export class UsersRoles extends Model {
	public readonly id: string;
	public readonly users?: User[];
	public readonly roles?: Role[];

	public static tableName = "users_roles";

	public static relationMappings = {
		users: {
			relation: Model.HasManyRelation,
			modelClass: User,
			join: {
				from: "users.id",
				to: "users_roles.userId",
			},
		},
		roles: {
			relation: Model.HasManyRelation,
			modelClass: Role,
			join: {
				from: "roles.id",
				to: "roles_roles.roleId",
			},
		},
	};
}
