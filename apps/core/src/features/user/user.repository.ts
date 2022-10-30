import { Injectable } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { User } from "./user.model";
import { Role as EnumRole } from "@shared";
import { Role } from "../role/role.model";
import Objection from "objection";

@Injectable()
export class UserRepository {
	public findById(id: ID): Promise<User | undefined> {
		return User.query().findById(id).execute();
	}

	public findByEmail(email: string): Promise<User | undefined> {
		return User.query().findOne("email", email).execute();
	}

	public async create(
		dto: Objection.PartialModelObject<User>,
		roles: EnumRole[] = []
	): Promise<User> {
		const insertedUser = await User.query().insertAndFetch(dto);
		if (roles.length > 0) {
			const fetchedRoles = await Role.query().whereIn("name", roles);
			await insertedUser.$relatedQuery("roles").relate(fetchedRoles);
		}
		return insertedUser;
	}

	public async count(): Promise<number> {
		const result = (await User.query().count().first().execute()) as
			| Record<"count", string>
			| undefined;
		return result !== undefined ? parseInt(result.count) : 0;
	}
}
