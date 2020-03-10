import appRender from "../../public/server.js";
import { website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(await Deno.readFile("./public/index.html"));

export function render(path: string, data: any = {}): string {
  const content = appRender({ url: path }, data);
  const html = htmlTemplate
    .replace("${page_title}", website.title)
    .replace("${content}", content);
  return html;
}
