import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import knex from "knex";
import { Model } from "objection";
import passport from "passport";
import { ConfigService } from "./config/config.service";
import { AppModule } from "./core/app/app.module";
import session from "express-session";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { DataInterceptor } from "./common/interceptors/data.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	Model.knex(
		knex({
			client: configService.get("DB_TYPE"),
			connection: {
				port: configService.get("DB_PORT"),
				host: configService.get("DB_HOST"),
				user: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
			},
		})
	);

	app.use(
		session({
			secret: configService.get("SESSION_SECRET"),
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: configService.get("NODE_ENV") === "production",
			},
		}),
		passport.initialize(),
		passport.session()
	)
		.useGlobalInterceptors(new DataInterceptor())
		.useGlobalFilters(new HttpExceptionFilter())
		.useGlobalPipes(new ValidationPipe({ transform: true }))
		.enableCors({
			origin: configService.get("CORS_ORIGIN"),
			credentials: true,
		});

	await app.listen(configService.get("PORT"));

	Logger.log(`Application is running on: ${await app.getUrl()}`, "NestApplication");
}

bootstrap();
