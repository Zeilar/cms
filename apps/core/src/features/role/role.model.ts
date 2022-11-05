import { Model } from "objection";
import { Tables } from "../../core/db/tables";
import { User } from "../user/user.model";

export class Role extends Model {
	public readonly id: string;
	public readonly name: string;
	public readonly users?: User[];

	public static tableName = Tables.ROLES;

	public static relationMappings = {
		users: {
			relation: Model.ManyToManyRelation,
			modelClass: User,
			join: {
				from: `${this.tableName}.id`,
				through: {
					from: `${Tables.USERS_ROLES}.roleId`,
					to: `${Tables.USERS_ROLES}.userId`,
				},
				to: `${Tables.USERS}.id`,
			},
		},
	};
}
