import { singleton } from "tsyringe";
import { createClient, RedisClientType } from "redis";
import config from "../config";

@singleton()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: config.redis_url,
    });
    this.client.connect().catch(console.error);
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.client.get(key);
    return cached ? (JSON.parse(cached) as T) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  }
}
