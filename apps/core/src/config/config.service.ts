import { Injectable, Logger } from "@nestjs/common";

interface ParsedConfig {
	PORT: number;
	CORS_ORIGIN: string;
	DB_TYPE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_NAME: string;
	HAS_ROUNDS: number;
}

const { PORT, CORS_ORIGIN, DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
	process.env;

const CONFIG: ParsedConfig = {
	PORT: parseInt(PORT),
	CORS_ORIGIN,
	DB_TYPE,
	DB_HOST,
	DB_PORT: parseInt(DB_PORT),
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
	HAS_ROUNDS: 10,
};

@Injectable()
export class ConfigService {
	public constructor() {
		if (process.env.NODE_ENV === "production") {
			return;
		}
		Logger.debug(
			`Registered environment variables:\n${JSON.stringify(CONFIG, null, 4)}`,
			"ConfigService"
		);
	}

	public get<K extends keyof ParsedConfig>(key: K) {
		if (!(key in CONFIG)) {
			throw new Error(`${key} does not exist in config`);
		}
		return CONFIG[key];
	}
}
