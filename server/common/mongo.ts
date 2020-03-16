import { init, MongoClient } from "mongo";
import { CONFIG_MONGODB_URI } from "../config.ts";

await init();

const mongo = new MongoClient();
const db = mongo.database("denocn");

export { db };
export async function connectMongodb() {
  mongo.connectWithUri(CONFIG_MONGODB_URI);
}
