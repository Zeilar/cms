import { Model } from "objection";
import { User } from "../user/user.model";

export class Role extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly users?: User[];

	public static tableName = "roles";

	public static relationMappings = {
		users: {
			relation: Model.ManyToManyRelation,
			modelClass: User,
			join: {
				from: "roles.id",
				through: {
					from: "users_roles.roleId",
					to: "users_roles.userId",
				},
				to: "users.id",
			},
		},
	};
}
