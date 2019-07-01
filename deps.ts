export { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
export * from "https://deno.land/x/dso@0.4.3/mod.ts";
export {
  Application,
  Context,
  HttpError,
  Router,
  RouterContext,
  send,
  Status
} from "https://deno.land/x/oak/mod.ts";
export { runTests, test } from "https://deno.land/x/std/testing/mod.ts";
export { uuid } from "https://deno.land/x/uuid/mod.ts";
export {
  default as Marked
} from "https://raw.githubusercontent.com/denolib/marked/master/main.ts";
export {
  Template
} from "https://raw.githubusercontent.com/zekth/deno_tiny_templates/master/mod.ts";

import * as _colors from "https://deno.land/std/colors/mod.ts";
export const colors = _colors;