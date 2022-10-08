import { Model } from "objection";
import { Role } from "../role/role.model";

export class User extends Model {
	public readonly id: string;
	public readonly email: string;
	public readonly name: string;

	public static get tableName() {
		return "users";
	}

	public static relationMappings = {
		roles: {
			relation: Model.ManyToManyRelation,
			modelClass: Role,
			join: {
				from: "users.id",
				through: {
					from: "users_roles.userId",
					to: "users_roles.roleId",
				},
				to: "roles.id",
			},
		},
	};
}