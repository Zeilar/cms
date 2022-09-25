import { Injectable } from "@nestjs/common";

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
	DB_LOGGING: boolean;
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
	DB_SYNCHRONIZE: DB_SYNCHRONIZE === "true",
	DB_LOGGING: DB_LOGGING === "true",
};

@Injectable()
export class ConfigService {
	public get<U extends keyof Env>(key: U) {
		if (!(key in ENV)) {
			throw new Error(`Key ${key} does not exist in env`);
		}
		return ENV[key];
	}
}