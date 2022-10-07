import { Injectable, Logger } from "@nestjs/common";

interface ParsedEnv {
	PORT: number;
	CORS_ORIGIN: string;
	DB_TYPE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_NAME: string;
}

const { PORT, CORS_ORIGIN, DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
	process.env;

const ENV: ParsedEnv = {
	PORT: parseInt(PORT),
	CORS_ORIGIN,
	DB_TYPE,
	DB_HOST,
	DB_PORT: parseInt(DB_PORT),
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
};

@Injectable()
export class ConfigService {
	public constructor() {
		if (process.env.NODE_ENV === "production") {
			return;
		}
		Logger.debug(
			`Registered environment variables:\n${JSON.stringify(ENV, null, 4)}`,
			"ConfigService"
		);
	}

	public get<U extends keyof ParsedEnv>(key: U) {
		if (!(key in ENV)) {
			throw new Error(`Environment variable ${key} does not exist`);
		}
		return ENV[key];
	}
}
