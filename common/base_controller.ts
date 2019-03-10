import { readAll } from "deno";
import { website } from "../config.ts";
import { Context, dejs } from "../deps.ts";

export class BaseController {
    ctx: Context;
    async render(view: string, params: any) {
        let { response } = this.ctx;
        response.type = ".html";
        const data = await readAll(await dejs.renderFile(
            `${Deno.cwd()}/views/layout.ejs`,
            { page: `${Deno.cwd()}/views/${view}.ejs`, config: website, data: params }
        ));
        response.body = data;
    }
}
