import { BaseController } from "../common/base_controller.ts";

export default class HomeController extends BaseController {
    async index() {
        await this.render("index", {});
    }
    async home() {
        await this.render("index", {});
    }
}