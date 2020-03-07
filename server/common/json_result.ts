import * as logger from "logger";
import { Context } from "oak";

export default async function jsonResultConvertor(
  ctx: Context,
  next: Function
) {
  let result: any;
  let success = true;
  let msg: string = "";
  try {
    result = await next();
  } catch (error) {
    logger.error(error);
    success = false;
    msg = error.message;
  }
  if (!result && !msg) {
    return;
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
