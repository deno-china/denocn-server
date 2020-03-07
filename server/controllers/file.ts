import {
  BaseController,
  Controller,
  Param,
  Post
} from "../common/base_controller.ts";
import { uuid } from "../deps.ts";

@Controller("/file")
export default class FileController extends BaseController {
  @Post("/upload")
  async upload() {
    const body = await this.ctx.request.body();
    body.type;
  }

  @Post("/base64upload")
  async base64upload(@Param("data") data: string) {
    let format = "";
    if (data.indexOf("data:image/jpeg;base64,") > -1) {
      data = data.replace("data:image/jpeg;base64,", "");
      format = ".jpg";
    } else if (data.indexOf("data:image/png;base64,") > -1) {
      data = data.replace("data:image/png;base64,", "");
      format = ".png";
    } else {
      throw new Error("不支持的格式");
    }

    const str = atob(data);

    const bytes: number[] = [];
    for (const char of str) {
      bytes.push(char.charCodeAt(0));
    }

    const path = "upload/" + uuid.generate() + format;
    Deno.mkdirSync("./public/upload", true);
    Deno.writeFileSync("./public/" + path, new Uint8Array(bytes));

    return { path: "https://data.denocn.org/" + path };
  }
}
