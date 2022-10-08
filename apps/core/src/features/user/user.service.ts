import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import type { ID } from "../../types/repository";
import { ConfigService } from "../../config/config.service";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService
	) {}

	public async register({ password, ...dto }: CreateUserDto): Promise<User> {
		if (await this.userRepository.findByEmail(dto.email)) {
			throw new ConflictException("Email is taken");
		}
		const encrypedPassword = await hash(password, this.configService.get("HAS_ROUNDS"));
		const user = await this.userRepository.create({ password: encrypedPassword, ...dto });
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
