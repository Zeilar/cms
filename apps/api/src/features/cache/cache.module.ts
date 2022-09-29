import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { CacheService } from "./cache.service";

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: "cache",
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.REDIS,
					options: {
						host: configService.get("REDIS_HOST"),
						port: configService.get("REDIS_PORT"),
						password: configService.get("REDIS_PASSWORD"),
					},
				}),
			},
		]),
	],
	providers: [CacheService],
	exports: [CacheService],
})
export class CacheModule {}
