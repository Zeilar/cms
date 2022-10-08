import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import knex from "knex";
import { Model } from "objection";
import { ConfigService } from "./config/config.service";
import { AppModule } from "./core/app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	Model.knex(
		knex({
			client: process.env.DB_TYPE,
			connection: {
				port: parseInt(process.env.DB_PORT),
				host: process.env.DB_HOST,
				user: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			},
		})
	);

	app.useGlobalPipes(new ValidationPipe({ transform: true })).enableCors({
		origin: configService.get("CORS_ORIGIN"),
		credentials: true,
	});

	await app.listen(configService.get("PORT"));

	Logger.log(`Application is running on: ${await app.getUrl()}`, "NestApplication");
}

bootstrap();
