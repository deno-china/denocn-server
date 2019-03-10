import { Context } from "../deps.ts";

export async function cookie(ctx: Context, next: () => void) {
  console.log("COOKIE_START");
  const cookie = ctx.request.headers.get("cookie");
  const cookies = new Map<string, string>();
  if (cookie) {
    cookie.split(";").forEach(pair => {
      const kv = pair.split("=");
      cookies.set(kv[0].trim(), kv[1].trim());
    });
  }
  ctx.state.cookies = cookies;
  await next();
  console.log("COOKIE_END");
}
