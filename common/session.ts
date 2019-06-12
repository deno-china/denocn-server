import { Context } from "../deps.ts";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";
import { getRedis } from "./redis.ts";

const SESSION_KEY = "oaksessionid";
const EXPIRE = 60 * 60 * 24; // one day

export async function redisSession(ctx: Context, next: () => void) {
  const redis = getRedis();
  let sessionId = ctx.state.cookies.get(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuid();
    const cookie = `${SESSION_KEY}=${sessionId}; Path=/; HttpOnly`;
    ctx.response.headers.append(`Set-Cookie`, cookie);
  }
  let redisSessionKey = `SESSION:${sessionId}`;
  let session = await redis.get(redisSessionKey);
  ctx.state.session = JSON.parse(session || "{}");
  await next();
  await redis.setex(redisSessionKey, EXPIRE, JSON.stringify(ctx.state.session));
}
