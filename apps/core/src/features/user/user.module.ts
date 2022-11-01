import { Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { RegisterTokenModule } from "../register-token/register-token.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
	imports: [ConfigModule, RegisterTokenModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService],
})
export class UserModule {}
