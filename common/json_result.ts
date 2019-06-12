import { Context } from "../deps.ts";

export default async function jsonResultConvertor(ctx: Context, next) {
  let result: any;
  let success = true;
  let msg: string;
  try {
    result = await next();
  } catch (error) {
    success = false;
    msg = error.message;
  }
  if (typeof result === "object") {
    ctx.response.body = {
      data: result,
      msg,
      success
    };
  } else {
    ctx.response.body = result;
  }
}
