import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
	ForbiddenException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { User } from "../user/user.model";
import { LoginGuard } from "../../common/guards/Login.guard";
import { AuthenticatedGuard } from "../../common/guards/Authenticated.guard";
import { FirstRegisterDto } from "@shared";

@Controller("/auth")
export class AuthController {
	public constructor(private readonly userService: UserService) {}

	@Get("/")
	@UseGuards(AuthenticatedGuard)
	public whoami(@Request() req: Express.Request): Express.Request["user"] {
		return req.user;
	}

	@Post("/login")
	@HttpCode(200)
	@UseGuards(LoginGuard)
	public login(@Request() req: Express.Request): Express.Request["user"] {
		return req.user;
	}

	@Post("/register")
	public register(@Body() dto: CreateUserDto): Promise<User> {
		return this.userService.register(dto);
	}

	@Post("/first-time-register")
	public async firstTimeRegister(@Body() dto: FirstRegisterDto): Promise<User> {
		const userCount = await this.userService.userCount();
		if (userCount > 0) {
			throw new ForbiddenException(
				"There must be exactly 0 users in the system in order to use this feature."
			);
		}
		return this.userService.createFirstUser(dto);
	}
}
