import { BaseController, Controller, Get } from "../common/base_controller.ts";
import App from "../views/App.tsx";

@Controller()
export default class HomeController extends BaseController {
  @Get("/jsx")
  jsx() {
    return this.render(App);
  }

  @Get("/")
  index() {
    return "Welcome to Deno China";
  }
}
