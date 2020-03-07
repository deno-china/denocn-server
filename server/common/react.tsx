import { dew as ReactDOMServerDew } from "https://dev.jspm.io/npm:react-dom@16.13.0/server.browser.dew.js";
import { dew as ReactDew } from "https://dev.jspm.io/npm:react@16.13.0/index.dew.js";

const ReactDOMServer: any = ReactDOMServerDew();
const React: any = ReactDew();

export function renderToString(jsx: any) {
  ReactDOMServer.renderToString(
    <html>
      <head>
        <title>deno react ssr</title>
      </head>
      <body>{jsx}</body>
    </html>
  );
}

export { React, ReactDOMServer };
