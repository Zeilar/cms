import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import type { ID } from "../../types/repository";
import { ConfigService } from "../../config/config.service";
import { hash } from "bcrypt";
import { FirstRegisterDto, RoleValues } from "@shared";
import { RegisterTokenService } from "../register-token/register-token.service";

@Injectable()
export class UserService {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService,
		private readonly registerTokenService: RegisterTokenService
	) {}

	public createFirstUser({ email, name, password }: FirstRegisterDto): Promise<User> {
		return this.userRepository.create({ email, name, password }, RoleValues); // Give first user every available role
	}

	public userCount(): Promise<number> {
		return this.userRepository.count();
	}

	public async register({ password, email, name, token }: CreateUserDto): Promise<User> {
		await this.registerTokenService.assertTokenIsValid(token, email);
		if (await this.userRepository.findByEmail(email)) {
			throw new ConflictException("Email is taken");
		}
		const encrypedPassword = await hash(password, this.configService.get("HASH_ROUNDS"));
		const user = await this.userRepository.create({
			password: encrypedPassword,
			email,
			name,
		});
		await this.registerTokenService.removeByToken(token);
		delete user.password;
		return user;
	}

	public findById(id: ID): Promise<User | undefined> {
		return this.userRepository.findById(id);
	}

	public findByEmail(id: string): Promise<User | undefined> {
		return this.userRepository.findByEmail(id);
	}
}
