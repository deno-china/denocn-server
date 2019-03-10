import { connect, sync } from "./models/main.ts";
import { User } from "./models/user.ts";

(async function () {
    await connect();
    await sync(true);

    await User.insert({
        name: "admin",
        password: "test",
    });

    await User.update(
        { name: "admin", password: "test22" },
        // { id: 1, },
    );

    await User.update(
        { name: "admin", password: "test11" },
        { id: 1, },
    );

    await User.update(
        { name: "admin", password: "tes33", id: 1 },
    );

    // (await User.findById("")).
})();