import { RouterContext } from "oak";
import { dayjs } from "../deps.ts";

export function dateFormat(format: string, date: Date) {
  return dayjs(date).format(format);
}

export async function getAllRequestParams(ctx: RouterContext) {
  let params: any = {};
  for (const pair of ctx.request.searchParams.entries()) {
    params[pair[0]] = pair[1];
  }
  const body = await ctx.request.body();
  if (body.type === "form") {
    const searchParams = body.value as URLSearchParams;
    for (const key of searchParams.keys()) {
      params[key] = searchParams.get(key);
    }
  } else if (body.type === "json") {
    params = { ...params, ...body.value };
  }
  return { ...ctx.params, ...params };
}

export function isSpider(ctx: RouterContext) {
  let ua = ctx.request.headers.get("user-agent") || "";
  ua = ua.toLowerCase();
  if (ua.includes("spider")) {
    return true;
  }
  if (ua.includes("googlebot")) {
    return true;
  }
  if (ua.includes("webspider")) {
    return true;
  }
  return false;
}
