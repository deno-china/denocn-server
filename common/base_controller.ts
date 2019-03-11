import { readAll } from "deno";
import { website } from "../config.ts";
import { dejs, RouterContext, Status } from "../deps.ts";

export class BaseController {
  ctx: RouterContext;
  async render(view: string, params: any) {
    let { response } = this.ctx;
    response.type = ".html";
    const session = this.ctx.state.session;
    const data = await readAll(
      await dejs.renderFile(`${Deno.cwd()}/views/layout.ejs`, {
        page: `${Deno.cwd()}/views/${view}.ejs`,
        config: website,
        session,
        data: { ...params, session }
      })
    );
    response.body = data;
  }
  redirect(url: string) {
    this.ctx.response.headers.append("Location", url);
    this.ctx.response.status = Status.Found;
  }
}
