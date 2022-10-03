import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import Redis, { RedisKey } from "ioredis";

@Injectable()
export class CacheService {
	private readonly client: Redis;

	public constructor(@Inject("cache") private readonly cache: ClientRedis) {
		this.client = this.cache.createClient();
		this.client.connect(() => {
			Logger.log("Connected to cache service", "CacheService");
		});
	}

	public async get<T>(key: RedisKey): Promise<T | null> {
		const data = await this.client.get(key);
		if (data == null) {
			return data;
		}
		return JSON.parse(data) as T;
	}

	public set(key: RedisKey, value: unknown): Promise<"OK"> {
		return this.client.set(key, JSON.stringify(value));
	}

	public delete(...keys: RedisKey[]): Promise<number> {
		return this.client.del(...keys);
	}

	public has(key: RedisKey): boolean {
		return this.client.get(key) == null;
	}
}
