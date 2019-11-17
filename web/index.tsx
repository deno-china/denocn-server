import App from "./App.tsx";
import ReactDOM from "react-dom";
import * as React from "react";

import "./index.less";

const state = window.$state || {};

ReactDOM.hydrate(<App {...state} />, document.getElementById("app"));
