import { BaseController, Controller, Get } from "../common/base_controller.ts";

@Controller()
export default class HomeController extends BaseController {
  @Get("/")
  index() {
    return "Welcome to Deno China";
  }
}
