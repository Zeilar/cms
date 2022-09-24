import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";

/* 
    DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=eI0l._qW1z
DB_NAME=whackakey
DB_SYNCHRONIZE=false
DB_LOGGING=false
*/

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			// @ts-expect-error type bug
			useFactory: async (configService: ConfigService) => ({
				type: configService.get("DB_TYPE"),
				host: configService.get("DB_HOST"),
				port: configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				synchronize: configService.get("DB_SYNCHRONIZE"),
				logging: configService.get("DB_LOGGING"),
			}),
		}),
	],
})
export class CoreModule {}
