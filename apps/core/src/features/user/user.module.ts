import { Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
	imports: [ConfigModule],
	providers: [UserService, UserRepository],
	exports: [UserService],
})
export class UserModule {}
