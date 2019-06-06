import {
  connect,
  Redis
} from "https://denopkg.com/keroxp/deno-redis@v0.3.0/redis.ts";
import { redis as config } from "../config.ts";

let redis: Redis;

export function getRedis() {
  return redis;
}

export async function connectRedis() {
  redis = await connect(`${config.host}:${config.port}`);
  if (config.password) {
    await redis.auth(config.password);
  }
  return redis;
}
