import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../../config/config.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { CustomPassportSerializer } from "./passport.serializer";

@Module({
	imports: [UserModule, ConfigModule, PassportModule.register({ session: true })],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, CustomPassportSerializer],
	exports: [AuthService],
})
export class AuthModule {}
