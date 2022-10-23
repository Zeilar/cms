import { Injectable, Logger } from "@nestjs/common";
import { NODE_ENV } from "../types/env";

interface ParsedConfig {
	NODE_ENV: NODE_ENV;
	PORT: number;
	CORS_ORIGIN: string;
	SESSION_SECRET: string;
	DB_TYPE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_NAME: string;
	HASH_ROUNDS: number;
}

const {
	NODE_ENV,
	PORT,
	CORS_ORIGIN,
	SESSION_SECRET,
	DB_TYPE,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
} = process.env;

const CONFIG: ParsedConfig = {
	NODE_ENV,
	PORT: parseInt(PORT),
	CORS_ORIGIN,
	SESSION_SECRET,
	DB_TYPE,
	DB_HOST,
	DB_PORT: parseInt(DB_PORT),
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
	HASH_ROUNDS: 10,
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
