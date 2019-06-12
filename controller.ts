import { router } from "./common/base_controller.ts";
import "./controllers/home.ts";
import "./controllers/topic.ts";
import "./controllers/user.ts";
import { Application } from "./deps.ts";

export default function initControllers(app: Application) {
  const routes = router.routes();
  app.use(routes);
  console.log("\nInit Controllers");
}
