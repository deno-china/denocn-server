import { dso, Join, Order, QueryOptions, Where } from "dso";
import {
  BaseController,
  Controller,
  Get,
  Param,
  Post
} from "../common/base_controller.ts";
import { Reply } from "../models/reply.ts";
import { Topic } from "../models/topic.ts";
import { User } from "../models/user.ts";

@Controller()
class TopicController extends BaseController {
  @Get("/topic/detail/:id")
  async detail(@Param("id") id: number) {
    const topic = await Topic.findById(id);

    dso.client.execute(`UPDATE topics SET ?? = ?? + 1 WHERE ?? = ?`, [
      "view_count",
      "view_count",
      "id",
      id
    ]);

    if (!topic) return null;
    const user = await User.findById(topic.author_id!);
    const lastReply = topic.last_reply_id
      ? await Reply.findById(topic.last_reply_id)
      : null;

    const replyUser =
      lastReply && lastReply.author_id
        ? await User.findById(lastReply.author_id)
        : null;

    return {
      ...topic,
      author: user ? { ...user, github_token: null, password: null } : null,
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

  @Post("/topic/edit")
  async edit(
    @Param("id") id: number,
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
    const topicId = await Topic.update({
      id,
      title,
      content,
      author_id: this.session.user.id,
      tags
    });

    return { id };
  }

  @Get("/topic/delete/:id")
  async delete(@Param("id") id: number) {
    const user = this.session.user;
    if (!user) throw new Error("未登录");
    const topic = await Topic.findById(id);
    if (topic?.author_id !== user.id) throw new Error("你没有删除权限");
    await Topic.update({ id, deleted: true });
    return { data: "success" };
  }

  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "good" | "hot" | "cold" | "job",
    @Param("page") page: number = 1,
    @Param("size") size: number = 20
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
      where: Where.field("topics.deleted").eq(false),
      order: [Order.by("topics.is_top").desc],
      limit: [(page - 1) * size, size]
    };
    switch (type) {
      case "all":
        options.order = options.order!.concat([
          Order.by("topics.last_reply_time").desc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "hot":
        options.order = options.order!.concat([
          Order.by("topics.reply_count").desc,
          Order.by("topics.last_reply_time").desc
        ]);
        break;
      case "good":
        options.where = Where.and(
          Where.field("topics.is_good").eq(true),
          options.where
        );
        options.order = options.order!.concat([
          Order.by("topics.last_reply_time").desc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "new":
        options.order = options.order!.concat([
          Order.by("topics.created_at").desc,
          Order.by("topics.last_reply_time").desc
        ]);
        break;
      case "cold":
        options.order = options.order!.concat([
          Order.by("topics.reply_count").asc,
          Order.by("topics.view_count").asc,
          Order.by("topics.created_at").desc
        ]);
        break;
      case "job":
        options.where = Where.and(
          Where.field("topics.type").eq(`招聘`),
          options.where
        );
        options.order = options.order!.concat([
          Order.by("topics.last_reply_time").asc,
          Order.by("topics.created_at").desc
        ]);
        break;
      default:
        options.where = Where.and(
          Where.field("tags").like(`%${type}%`),
          options.where
        );
        options.order!.concat([
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
