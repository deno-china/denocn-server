import * as config from "./config.ts";
import { abc } from "./deps.ts";
import { connect as connectDb } from "./models/main.ts";
import { User } from "./models/user.ts";

const app = abc();

app.get("/hello", ctx => {
    return "Hello, Abc!";
});

app.get("/user", async ctx => {
    const user = await User.findById(1);
    console.log(user, user.name);
    return `Hello ${user.name}`;
});

(async function () {
    await connectDb();
    app.start(`${config.startup.host}:${config.startup.port}`);
})();