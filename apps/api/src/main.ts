import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "./config/config.service";
import { CoreModule } from "./core/core.module";

async function bootstrap() {
	const app = await NestFactory.create(CoreModule);

	const configService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe({ transform: true })).enableCors({
		origin: configService.get<string>("CORS_ORIGIN"),
		credentials: true,
	});

	await app.listen(configService.get<number>("PORT"));

	Logger.log(`Application is running on: ${await app.getUrl()}`, "NestApplication");
}

bootstrap();
