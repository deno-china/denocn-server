import ReactDOM from "https://dev.jspm.io/react-dom/server";
import React from "https://dev.jspm.io/react";

globalThis.React = React;

export function render(View: any, data: Object): string {
  return ReactDOM.renderToString(<View {...data} />);
}
