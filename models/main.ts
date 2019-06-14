import * as config from "../config.ts";
import { dso } from "../deps.ts";
import "./topic.ts";
import "./user.ts";

export async function connect() {
  await dso.connect(config.mysql);
}

export async function sync(force: boolean) {
  await dso.sync(force);
}
