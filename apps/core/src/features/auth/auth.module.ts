import { Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [UserModule, ConfigModule],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
