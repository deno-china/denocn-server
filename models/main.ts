import * as orm from "../common/orm.ts";
import * as config from "../config.ts";
import "./user.ts";

export async function connect() {
    await orm.connect(config.mysql);
}