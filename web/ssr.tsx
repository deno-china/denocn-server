import { createMemoryHistory } from "history";
import * as React from "react";
import "./index.less";
import { Routes } from "./routes";

export default function App(props: { route: string; data: object }) {
  const history = createMemoryHistory({
    initialEntries: [props.route],
    initialIndex: 0
  });
  return <Routes history={history} data={props.data} />;
}
