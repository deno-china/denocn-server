import {
  connect,
  Redis
} from "https://raw.githubusercontent.com/manyuanrong/deno-redis/fix_unicode/redis.ts";
// } from "https://denopkg.com/keroxp/deno-redis@v0.2.2/redis.ts";

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
