import ReactDOM from "https://dev.jspm.io/react-dom/server";
import { website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(
  await Deno.readFile("../public/index.html")
);

export function render(component: Function, data: Object): string {
  const content = ReactDOM.renderToString(component(data));
  const html = htmlTemplate
    .replace("${page_title}", website.title)
    .replace("${content}", content)
    .replace('"${state}"', JSON.stringify(data));
  return html;
}
