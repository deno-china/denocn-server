import { BaseController, Controller, Get } from "../common/base_controller.ts";
import app from "../../public/ssr.js";

@Controller()
export default class HomeController extends BaseController {
  @Get("/jsx")
  jsx() {
    return this.render(app, {
      name: "TOM",
      age: 26
    });
  }

  @Get("/")
  index() {
    return "Welcome to Deno China";
  }
}
