import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../../common/validators/user/CreateUserDto";
import { User } from "../user/user.model";
import { LocalAuthGuard } from "../../common/guards/local-auth.guard";

@Controller("/auth")
export class AuthController {
	public constructor(private readonly userService: UserService) {}

	@Get("/")
	@UseGuards(LocalAuthGuard)
	public whoami(@Request() req: Express.Request): Express.Request["user"] {
		return req.user;
	}

	@Post("/login")
	@UseGuards(LocalAuthGuard)
	public login(@Request() req: Express.Request): Express.Request["user"] {
		return req.user;
	}

	@Post("/register")
	public register(@Body() dto: CreateUserDto): Promise<User> {
		return this.userService.register(dto);
	}
}
