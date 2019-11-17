import { redis as config } from "../config.ts";
import { Redis, redisConnect } from "../deps.ts";

let redis: Redis;

export function getRedis() {
  return redis;
}

export async function connectRedis() {
  redis = await redisConnect(`${config.host}:${config.port}`);
  if (config.password) {
    await redis.auth(config.password);
  }
  return redis;
}
