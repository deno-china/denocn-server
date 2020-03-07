import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";
import { Context } from "oak";
import { getRedis } from "./redis.ts";
import { State } from "./state.ts";

const SESSION_KEY = "oaksessionid";
const EXPIRE = 60 * 60 * 24; // one day

export async function redisSession(ctx: Context<State>, next: () => void) {
  const redis = await getRedis();
  let sessionId = ctx.state.cookies.get(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuid();
    const cookie = `${SESSION_KEY}=${sessionId}; Path=/; HttpOnly`;
    ctx.response.headers.append(`Set-Cookie`, cookie);
  }
  let redisSessionKey = `SESSION:${sessionId}`;
  let session: any = null;
  try {
    session = await redis.get(redisSessionKey);
  } catch (e) {
    console.log(e);
  }
  ctx.state.session = JSON.parse(session || "{}");
  await next();
  await redis.setex(redisSessionKey, EXPIRE, JSON.stringify(ctx.state.session));
}
