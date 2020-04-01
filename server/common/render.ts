import appRender from "../../public/server.js";
import { startup, website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(await Deno.readFile("./public/index.html"));

export async function render(
  params: { url: string; search?: string },
  data: any = {}
): Promise<string> {
  const { html, state, meta } = await appRender({
    api_base: `http://127.0.0.1:${startup.port}`,
    params,
    data
  });
  return htmlTemplate
    .replace("${page_title}", meta?.title || website.title)
    .replace("${content}", html)
    .replace(
      `<head>`,
      `<head>
        <meta name="keywords" content="${meta?.keywords}" />
        <meta name="description" content="${meta?.description ||
          meta?.title}" />`
    )
    .replace(
      `</body>`,
      `<script>window.__INIT_STATE__=${JSON.stringify(state)};</script></body>`
    );
}
