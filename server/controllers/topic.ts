import { ObjectId } from "mongo";
import {
  BaseController,
  Controller,
  Get,
  Param,
  Post
} from "../common/base_controller.ts";
import { lookupReply, lookupUser } from "../common/query-util.ts";
import { Reply } from "../models/reply.ts";
import { Topic, TopicType } from "../models/topic.ts";
import { User } from "../models/user.ts";

@Controller("/api")
class TopicController extends BaseController {
  @Get("/topic/detail/:id")
  async detail(@Param("id") id: string) {
    const topic = await Topic.findById(id);
    if (!topic) return null;

    topic.view_count++;
    await Topic.update(topic);

    const user = await User.findById(topic.author_id);
    const { last_reply_id } = topic;
    const lastReply = last_reply_id
      ? await Reply.findById(last_reply_id)
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
    @Param("type") type: TopicType,
    @Param("title") title: string
  ) {
    if (!this.session.user) throw new Error("用户未登录");
    if (!content || content.length < 20) {
      throw new Error("内容长度最少20个字符");
    }
    if (!title || title.length < 5) {
      throw new Error("标题长度至少5个字符");
    }
    const topic = await Topic.create({
      title,
      content,
      author_id: this.session.user._id,
      type: type
    });

    return topic;
  }

  @Post("/topic/edit")
  async edit(
    @Param("id") id: string,
    @Param("content") content: string,
    @Param("type") type: TopicType,
    @Param("title") title: string
  ) {
    if (!this.session.user) throw new Error("用户未登录");
    if (!content || content.length < 10) {
      throw new Error("内容长度最少10个字符");
    }
    if (!title || title.length < 5) {
      throw new Error("标题长度至少5个字符");
    }
    await Topic.update({
      _id: ObjectId(id),
      title,
      content,
      author_id: this.session.user._id,
      type: type
    });

    return { id };
  }

  @Get("/topic/delete/:id")
  async delete(@Param("id") id: string) {
    const user = this.session.user;
    if (!user) throw new Error("未登录");
    const topic = await Topic.findById(id);
    if (topic?.author_id.$oid !== user._id.$oid) {
      throw new Error("你没有删除权限");
    }
    await Topic.update({ _id: ObjectId(id), deleted: true });
    return { data: "success" };
  }

  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "good" | "hot" | "cold" | "job",
    @Param("page") page: number = 1,
    @Param("size") size: number = 20
  ) {
    const filter: any = {};

    switch (type) {
      case "job":
        filter.type = "招聘";
        break;
      case "good":
        filter.is_good = true;
        break;
      case "hot":
        // filter.is_hot = true;
        break;
      case "cold":
        break;
      case "new":
        break;
    }

    const total = await Topic.count(filter);
    const topics = await Topic.aggregate([
      { $match: filter },
      lookupUser("author_id", "author"),
      lookupReply("last_reply_id", "last_reply"),
      { $unwind: { path: "$author" } },
      { $unwind: { path: "$last_reply", preserveNullAndEmptyArrays: true } }
    ]);
    return {
      page,
      size,
      total,
      list: topics
    };
  }
}
