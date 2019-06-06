import { RouterContext, Status } from "../deps.ts";

export class BaseController {
  ctx: RouterContext;
  redirect(url: string) {
    this.ctx.response.headers.append("Location", url);
    this.ctx.response.status = Status.Found;
  }
}
