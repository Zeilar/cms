import { Injectable, Logger } from "@nestjs/common";
import { LoggerOptions } from "typeorm";

type LoggerArrayOption = "query" | "schema" | "error" | "warn" | "info" | "log" | "migration";

interface Env {
	PORT: number;
	CORS_ORIGIN: string;
	DB_TYPE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_NAME: string;
	DB_SYNCHRONIZE: boolean;
	DB_LOGGING: LoggerOptions;
}

function dbLoggingErrorMessage(data: string) {
	return `Invalid JSON at DB_LOGGING: ${JSON.stringify(data)}`;
}

function parseDbLogging(data: string): LoggerOptions {
	if (data === "all") {
		return data;
	}
	try {
		const parsed: unknown = JSON.parse(data);
		if (typeof parsed === "boolean") {
			return parsed;
		}
		if (!Array.isArray(parsed)) {
			throw new Error(dbLoggingErrorMessage(data));
		}
		const options: LoggerArrayOption[] = ["query", "schema", "error", "warn", "info", "log", "migration"];
		if (!parsed.every(value => options.includes(value))) {
			throw new Error(dbLoggingErrorMessage(data));
		}
		return parsed;
	} catch (_error) {
		throw new Error(dbLoggingErrorMessage(data));
	}
}

const { PORT, CORS_ORIGIN, DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNCHRONIZE, DB_LOGGING } =
	process.env;

const ENV: Env = {
	PORT: parseInt(PORT),
	CORS_ORIGIN,
	DB_TYPE,
	DB_HOST,
	DB_PORT: parseInt(DB_PORT),
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
	DB_SYNCHRONIZE: JSON.parse(DB_SYNCHRONIZE),
	DB_LOGGING: parseDbLogging(DB_LOGGING),
};

@Injectable()
export class ConfigService {
	public constructor() {
		Logger.debug(`Registered environment variables:\n${JSON.stringify(ENV, null, 4)}`, "ConfigService");
	}

	public get<U extends keyof Env>(key: U) {
		if (!(key in ENV)) {
			throw new Error(`Key ${key} does not exist in env`);
		}
		return ENV[key];
	}
}
