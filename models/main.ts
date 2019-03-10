import { dso } from "../deps.ts";
import * as config from "../config.ts";
import "./message.ts";
import "./user.ts";

export async function connect() {
    await dso.connect(config.mysql);
}

export async function sync(force: boolean) {
    await dso.sync(force);
}