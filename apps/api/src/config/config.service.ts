import { Injectable } from "@nestjs/common";

interface Env {
	PORT: number;
	CORS_ORIGIN: string;
}

const { PORT, CORS_ORIGIN } = process.env;

const ENV: Env = {
	PORT: parseInt(PORT),
	CORS_ORIGIN,
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
