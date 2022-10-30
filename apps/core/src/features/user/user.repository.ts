import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { Injectable } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { User } from "./user.model";
import { Role as EnumRole } from "@shared";
import { Role } from "../role/role.model";

@Injectable()
export class UserRepository {
	public findById(id: ID): Promise<User | undefined> {
		return User.query().findById(id).execute();
	}

	public findByEmail(email: string): Promise<User | undefined> {
		return User.query().findOne({ email }).execute();
	}

	public async create(
		{ email, name, password }: CreateUserDto,
		roles?: EnumRole[]
	): Promise<User> {
		const insertedUser = await User.query().insertAndFetch({ email, name, password }).execute();
		if (Array.isArray(roles)) {
			const fetchedRoles = await Role.query().whereIn("name", roles);
			await insertedUser.$relatedQuery("roles").relate(fetchedRoles);
		}
		return insertedUser;
	}
}
