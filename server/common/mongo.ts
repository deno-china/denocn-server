import { init, MongoClient } from "mongo";
import { CONFIG_MONGODB_URI } from "../config.ts";

await init();

const mongo = new MongoClient();
mongo.connectWithUri(CONFIG_MONGODB_URI);
const db = mongo.database("denocn");

export { db };
