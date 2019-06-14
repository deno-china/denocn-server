import {
  BaseController,
  Controller,
  Get,
  Param
} from "../common/base_controller.ts";
import { Order, Join } from "../deps.ts";
import { Topic } from "../models/topic.ts";

type TopicListFilter = "all" | "new" | "job" | "good" | "hot" | "cold";

@Controller("/topic")
class TopicController extends BaseController {
  @Get("/all")
  async list(
    @Param("page") page: number = 1,
    @Param("size") size: number = 10
  ) {
    console.log(page);
    const topics = await Topic.findAll({
      fields: [
        "topics.*",
        "users.nick_name as user_nick_name",
        "users.avatar as user_avatar"
      ],
      join: [Join.left("users").on("users.id", "topics.author_id")],
      order: [
        Order.by("topics.updated_at").desc,
        Order.by("topics.created_at").desc
      ],
      limit: [(page - 1) * size, size]
    });
    return topics;
  }

  listAll() {
    return Topic.findAll({});
  }
}
