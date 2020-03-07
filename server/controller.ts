import { Application } from "oak";
import { router } from "./common/base_controller.ts";
import { State } from "./common/state.ts";
// import "./controllers/file.ts";
// import "./controllers/home.ts";
// import "./controllers/reply.ts";
// import "./controllers/topic.ts";
// import "./controllers/user.ts";

export async function loadControllers() {
  const dirs = await Deno.readDir("./server/controllers");
  for (const file of dirs) {
    await import(`./controllers/${file.name}`);
  }
}

export default async function initControllers(app: Application<State>) {
  await loadControllers();
  const routes = router.routes();
  app.use(routes);
  console.log("\nInit Controllers");
}
