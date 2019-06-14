import { Context } from "../deps.ts";

export default async function jsonResultConvertor(ctx: Context, next) {
  let result: any;
  let success = true;
  let msg: string;
  try {
    result = await next();
  } catch (error) {
    console.error(error);
    success = false;
    msg = error.message;
  }
  if (typeof result === "object" || msg) {
    ctx.response.body = {
      data: result,
      msg,
      success
    };
  } else {
    ctx.response.body = result;
  }
}
