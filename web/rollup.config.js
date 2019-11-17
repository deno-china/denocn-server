import typescript from "rollup-plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import less from "rollup-plugin-less";

import { compilerOptions } from "./tsconfig.json";

export default {
  input: "App.tsx",
  plugins: [
    commonjs(),
    less({ output: false }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    typescript(compilerOptions)
  ],
  output: {
    file: "../public/ssr.js",
    format: "esm"
  }
};
