import { Inject, Injectable } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import Redis from "ioredis";

@Injectable()
export class CacheService {
	private client: Redis;

	public constructor(@Inject("cache") private readonly cache: ClientRedis) {
		this.createClient();
	}

	public async createClient() {
		this.client = this.cache.createClient();
		this.client.connect();
	}
}
