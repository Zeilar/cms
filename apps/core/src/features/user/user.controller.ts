import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@Get("/is-first-user-created")
	public isFirstUserCreated(): Promise<boolean> {
		return this.userService.isFirstUserCreated();
	}
}
