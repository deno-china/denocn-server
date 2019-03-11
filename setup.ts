import { mysql } from "./config.ts";
import { Client, dso } from "./deps.ts";
import { sync } from "./models/main.ts";
import { User } from "./models/user.ts";

(async function() {
  const client = new Client();
  await client.connect({
    hostname: mysql.hostname,
    port: mysql.port,
    debug: false,
    username: mysql.username,
    password: mysql.password,
    db: ""
  });
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${mysql.db}`);
  await client.execute(`USE ${mysql.db}`);
  await dso.connect(client);
  await sync(true);

  await User.insert({
    name: "admin",
    password: "test"
  });
})();
