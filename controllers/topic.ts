import {
  BaseController,
  Controller,
  Get,
  Param,
  Post
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

  @Post("/topic/add")
  async add(
    @Param("content") content: string,
    @Param("tags") tags: string,
    @Param("title") title: string
  ) {
    if (!this.session.user) throw new Error("用户未登录");
    if (!content || content.length < 20) {
      throw new Error("内容长度最少20个字符");
    }
    if (!title || title.length < 5) {
      throw new Error("标题长度至少5个字符");
    }
    const topicId = await Topic.insert({
      title,
      content,
      author_id: this.session.user.id,
      tags
    });

    return { id: topicId };
  }

  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "good" | "hot" | "cold" | "job",
    @Param("page") page: number = 1,
    @Param("size") size: number = 30
  ) {
    const options: QueryOptions = {
      fields: [
        "topics.*",
        "users.nick_name as user_nick_name",
        "users.avatar as user_avatar",
        "reply_user.nick_name as reply_user_name",
        "reply_user.id as reply_user_id",
        "reply_user.avatar as reply_user_avatar"
      ],
      join: [
        Join.left("users").on("users.id", "topics.author_id"),
        Join.left("replies").on("replies.id", "topics.last_reply_id"),
        Join.left("users", "reply_user").on(
          "reply_user.id",
          "replies.author_id"
        )
      ],
      order: [Order.by("topics.is_top").desc],
      limit: [(page - 1) * size, size]
    };
    switch (type) {
      case "all":
        options.order = options.order.concat([
          Order.by("topics.last_reply_time").desc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "hot":
        options.order = options.order.concat([
          Order.by("topics.reply_count").desc,
          Order.by("topics.last_reply_time").desc
        ]);
        break;
      case "good":
        options.where = Where.field("topics.is_good").eq(true);
        options.order = options.order.concat([
          Order.by("topics.last_reply_time").desc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "new":
        options.order = options.order.concat([
          Order.by("topics.created_at").desc,
          Order.by("topics.last_reply_time").desc
        ]);
        break;
      case "cold":
        options.order = options.order.concat([
          Order.by("topics.reply_count").asc,
          Order.by("topics.view_count").asc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "job":
        options.where = Where.field("topics.type").eq(`招聘`);
        options.order = options.order.concat([
          Order.by("topics.last_reply_time").asc,
          Order.by("topics.created_at").desc
        ]);
        break;
      default:
        options.where = Where.field("tags").like(`%${type}%`);
        options.order.concat([
          Order.by("topics.last_reply_time").asc,
          Order.by("topics.created_at").desc
        ]);
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
