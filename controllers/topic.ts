import { BaseController, Controller, Get, Param } from "../common/base_controller.ts";
import { Join, Order, QueryOptions, Where } from "../deps.ts";
import { Topic } from "../models/topic.ts";

@Controller()
class TopicController extends BaseController {
  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "hot" | "cold" | "job",
    @Param("page") page: number = 1,
    @Param("size") size: number = 10
  ) {
    const options: QueryOptions = {
      fields: [
        "topics.*",
        "users.nick_name as user_nick_name",
        "users.avatar as user_avatar"
      ],
      join: [Join.left("users").on("users.id", "topics.author_id")],
      limit: [(page - 1) * size, size]
    };
    switch (type) {
      case "all":
        options.order = [
          Order.by("topics.updated_at").desc,
          Order.by("topics.created_at").desc
        ];
        break;
      case "hot":
        options.order = [
          Order.by("topics.reply_count").desc,
          Order.by("topics.updated_at").desc
        ];
        break;
      case "new":
        options.order = [
          Order.by("topics.created_at").desc,
          Order.by("topics.updated_at").desc
        ];
        break;
      case "cold":
        options.order = [
          Order.by("topics.view_count").asc,
          Order.by("topics.reply_count").asc,
          Order.by("topics.created_at").desc
        ];
        break;
      case "job":
        options.where = Where.field("tags").like("%job%");
        options.order = [
          Order.by("topics.updated_at").asc,
          Order.by("topics.created_at").desc
        ];
        break;
      default:
        return "Unknown type";
    }
    const { total = 0 } = (await Topic.findOne({
      ...options,
      fields: ["COUNT(*) AS total"]
    })) as any;
    const topics = await Topic.findAll(options);
    return {
      page,
      size,
      total,
      list: topics
    };
  }
}
