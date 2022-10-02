import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import knex from "knex";
import { Model } from "objection";
import { ConfigService } from "./config/config.service";
import { CoreModule } from "./core/core.module";
import connection from "../knexfile";

async function bootstrap() {
	const app = await NestFactory.create(CoreModule);
	const configService = app.get(ConfigService);

	Model.knex(knex(connection));

	app.useGlobalPipes(new ValidationPipe({ transform: true })).enableCors({
		origin: configService.get("CORS_ORIGIN"),
		credentials: true,
	});

	await app.listen(configService.get("PORT"));

	Logger.log(`Application is running on: ${await app.getUrl()}`, "NestApplication");
}

bootstrap();
