import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { Space } from "../features/space/space.entity";
import { ContentType } from "../features/content-type/content-type.entity";
import { SpaceModule } from "../features/space/space.module";
import { ContentTypeModule } from "../features/content-type/content-type.module";
import { Field } from "../features/field/field.entity";
import { FieldModule } from "../features/field/field.module";
import { CacheModule } from "../features/cache/cache.module";

@Module({
	imports: [
		ConfigModule,
		CacheModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: configService.get("DB_TYPE") as "postgres", // Temorary fix due to type bugs in TypeOrmModuleOptions
				host: configService.get("DB_HOST"),
				port: configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				synchronize: configService.get("DB_SYNCHRONIZE"),
				logging: configService.get("DB_LOGGING"),
				entities: [Space, ContentType, Field],
			}),
		}),
		SpaceModule,
		ContentTypeModule,
		FieldModule,
	],
})
export class CoreModule {}
