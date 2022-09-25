import { Injectable, Logger } from "@nestjs/common";

type LOGGING_OPTION = "query" | "error" | "schema" | "warn" | "info" | "log" | "all";
type DB_LOGGING = boolean | LOGGING_OPTION | LOGGING_OPTION[];

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
	DB_LOGGING: DB_LOGGING;
}

function parseDbLogging(data: string): DB_LOGGING {
	if (data === "true" || data === "false") {
		return JSON.parse(data);
	}
	const options: LOGGING_OPTION[] = ["query", "error", "schema", "warn", "info", "log", "all"];
	if (options.includes(data as LOGGING_OPTION)) {
		return data as LOGGING_OPTION;
	}
	return JSON.parse(data);
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
