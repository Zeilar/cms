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
	public get<T>(key: keyof Env): T {
		return ENV[key] as unknown as T;
	}
}
