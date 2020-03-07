//
import * as ReactDOM from "https://dev.jspm.io/npm:react-dom@16.13.0/server.browser.dew.js";
import { website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(
  await Deno.readFile("../public/index.html")
);

export function render(component: Function, data: any): string {
  const content = (ReactDOM as any).renderToString(component(data));
  const html = htmlTemplate
    .replace("${page_title}", website.title)
    .replace("${content}", content)
    .replace('"${state}"', JSON.stringify(data));
  return html;
}
