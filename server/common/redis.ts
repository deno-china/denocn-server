import { connect, Redis } from "redis";
import { redis as config } from "../config.ts";

let redis: Redis;

export function getRedis() {
  return redis ? redis : connectRedis();
}

export async function connectRedis() {
  const { host: hostname, port } = config;
  redis = await connect({ hostname, port });
  if (config.password) {
    await redis.auth(config.password);
  }
  return redis;
}
