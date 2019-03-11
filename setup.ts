import { Client, dso } from "./deps.ts";
import { sync } from "./models/main.ts";
import { User } from "./models/user.ts";

(async function() {
  const client = new Client();
  await client.connect({
    hostname: "127.0.0.1",
    port: 3306,
    debug: false,
    username: "root",
    password: "",
    db: ""
  });
  await client.execute(`CREATE DATABASE IF NOT EXISTS denocn`);
  await client.execute(`USE denocn`);
  await dso.connect(client);
  await sync(true);

  await User.insert({
    name: "admin",
    password: "test"
  });
})();
