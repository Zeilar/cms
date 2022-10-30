import { Body, Controller, Post } from "@nestjs/common";
import { RegisterTokenService } from "./register-token.service";
import { RegisterToken } from "./register-token.model";
import { RegisterTokenDto } from "../../common/validators/register-token/RegisterTokenDto";

@Controller("/register-token")
export class RegisterTokenController {
	public constructor(public readonly registerTokenService: RegisterTokenService) {}

	@Post("/")
	public create(@Body() dto: RegisterTokenDto): Promise<RegisterToken> {
		return this.registerTokenService.create(dto);
	}
}
