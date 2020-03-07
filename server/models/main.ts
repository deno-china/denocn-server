import { dso } from "dso";
import * as config from "../config.ts";
import "./reply.ts";
import "./topic.ts";
import "./user.ts";

dso.showQueryLog = false;

export async function loadModels() {
  const dirs = await Deno.readDir("./server/models");
  for (const file of dirs) {
    if (file.name !== "main.ts") {
      await import(`./${file.name}`);
    }
  }
}

export async function connect() {
  await loadModels();
  await dso.connect(config.mysql);
  await dso.sync(false);
}

export async function sync(force: boolean) {
  await dso.sync(force);
}
