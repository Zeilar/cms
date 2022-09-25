import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { Space } from "../features/space/space.entity";
import { ContentType } from "../features/content-type/content-type.entity";

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			// @ts-expect-error type bug
			useFactory: (configService: ConfigService) => ({
				type: configService.get("DB_TYPE"),
				host: configService.get("DB_HOST"),
				port: configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				synchronize: configService.get("DB_SYNCHRONIZE"),
				logging: configService.get("DB_LOGGING"),
				entities: [Space, ContentType],
			}),
		}),
	],
})
export class CoreModule {}
