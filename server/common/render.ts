import appRender from "../../public/server.js";
import { website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(await Deno.readFile("./public/index.html"));

export async function render(path: string, data: any = {}): Promise<string> {
  const { html, state } = await appRender({ url: path }, data);
  return htmlTemplate
    .replace("${page_title}", website.title)
    .replace("${content}", html)
    .replace(`"__INIT_STATE__"`, JSON.stringify(state));
}
