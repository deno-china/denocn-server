import { BaseController } from "../common/base_controller.ts";

export default class SinglePagesController extends BaseController {
  async api() {
    await this.render("coming_soon", {});
  }

  async about() {
    await this.render("coming_soon", {});
  }

  async gettingStart() {
    await this.render("coming_soon", {});
  }
}
