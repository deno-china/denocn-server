import { init, MongoClient } from "mongo";

await init();

const mongo = new MongoClient();
mongo.connectWithUri("mongodb://127.0.0.1:27017");
const db = mongo.database("denocn");

export { db };
