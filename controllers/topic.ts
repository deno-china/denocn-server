import {
  BaseController,
  Controller,
  Get,
  Param
} from "../common/base_controller.ts";
import { Join, Order, QueryOptions, Where } from "../deps.ts";
import { Reply } from "../models/reply.ts";
import { Topic } from "../models/topic.ts";
import { User } from "../models/user.ts";

@Controller()
class TopicController extends BaseController {
  @Get("/topic/detail/:id")
  async detail(@Param("id") id: number) {
    const topic = await Topic.findById(id);
    if (!topic) return null;
    const user = await User.findById(topic.author_id);
    const lastReply = topic.last_reply_id
      ? await Reply.findById(topic.last_reply_id)
      : null;

    const replyUser =
      lastReply && lastReply.author_id
        ? await User.findById(lastReply.author_id)
        : null;

    return {
      ...topic,
      author: { ...user, github_token: null, password: null },
      last_reply: lastReply ? { ...lastReply, author: replyUser } : null
    };
  }

  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "good" | "hot" | "cold" | "job",
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
      case "good":
        options.where = Where.field("topics.is_good").eq(true);
        options.order = [
          Order.by("topics.updated_at").desc,
          Order.by("topics.created_at").desc
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
      default:
        options.where = Where.field("tags").like(`%${type}%`);
        options.order = [
          Order.by("topics.updated_at").asc,
          Order.by("topics.created_at").desc
        ];
    }
    const { total = 0 } = (await Topic.findOne({
      ...options,
      fields: ["COUNT(*) AS total"],
      order: [],
      join: []
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
