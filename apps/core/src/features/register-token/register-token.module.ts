import { Module } from "@nestjs/common";
import { RegisterTokenController } from "./register-token.controller";
import { RegisterTokenRepository } from "./register-token.repository";
import { RegisterTokenService } from "./register-token.service";

@Module({
	controllers: [RegisterTokenController],
	providers: [RegisterTokenService, RegisterTokenRepository],
	exports: [RegisterTokenService],
})
export class RegisterTokenModule {}
