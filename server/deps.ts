export { v4 as uuid } from "std/uuid/mod.ts";
export { default as Marked } from "https://raw.githubusercontent.com/olaven/marked/strict-types/main.ts";
export { Template } from "https://raw.githubusercontent.com/zekth/deno_tiny_templates/master/mod.ts";
import { dew as dewDayjs } from "https://dev.jspm.io/npm:dayjs@1.8.21/dayjs.min.dew.js";

export const dayjs: any = dewDayjs();
