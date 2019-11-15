import { router } from "./common/base_controller.ts";
import { Application } from "./deps.ts";

async function loadControllers() {
  const dirs = await Deno.readDir("./controllers");
  for (const file of dirs) {
    await import(`./controllers/${file.name}`);
  }
}

export default async function initControllers(app: Application) {
  await loadControllers();
  const routes = router.routes();
  app.use(routes);
  console.log("\nInit Controllers");
}
