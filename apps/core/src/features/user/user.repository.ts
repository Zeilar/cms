import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { Injectable } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { User } from "./user.model";

@Injectable()
export class UserRepository {
	public findById(id: ID): Promise<User | undefined> {
		return User.query().findById(id).execute();
	}

	public findByEmail(email: string): Promise<User | undefined> {
		return User.query().findOne({ email }).execute();
	}

	public create(user: CreateUserDto): Promise<User> {
		return User.query().insertAndFetch(user).execute();
	}
}
