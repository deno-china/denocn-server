// pre compile for dynamic load files

import { loadControllers } from "./controller.ts";
import { loadModels } from "./models/main.ts";

await loadControllers();
await loadModels();