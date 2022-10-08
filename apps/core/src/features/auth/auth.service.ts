import { Injectable } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { UserService } from "../user/user.service";
import { compare } from "bcrypt";
import { User } from "../user/user.model";

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService) {}

	public tryPassword(password: string, encrypted: string): Promise<boolean> {
		return compare(password, encrypted);
	}

	public async validateUser(email: string, pwd: string): Promise<User | null> {
		const user = await this.userService.findByEmail(email);
		if (!user || !user.password) {
			return null;
		}
		const matches = await this.tryPassword(pwd, user.password);
		if (!matches) {
			return null;
		}
		delete user.password;
		return user;
	}
}
