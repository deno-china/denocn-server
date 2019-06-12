export { Client, replaceParams } from "https://deno.land/x/mysql/mod.ts";
export {
  Application,
  Context,
  HttpError,
  Router,
  RouterContext,
  send,
  Status
} from "https://deno.land/x/oak/mod.ts";
export {
  assert,
  assertEquals
} from "https://deno.land/x/testing@v0.3.1/asserts.ts";
export { test, runTests } from "https://deno.land/x/std/testing/mod.ts";

import * as _colors from "https://deno.land/x/std@v0.3.1/colors/mod.ts";
import * as _dso from "https://raw.githubusercontent.com/manyuanrong/dso/v0.1.4/mod.ts";
export const dso = _dso;
export const colors = _colors;
