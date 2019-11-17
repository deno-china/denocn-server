import App from "./web/bundle.js";
import ReactDOM from "https://dev.jspm.io/react-dom/server";

console.log(
  ReactDOM.renderToString(
    App({
      name: "Tom",
      age: 25
    })
  )
);
