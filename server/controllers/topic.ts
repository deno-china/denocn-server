import { ObjectId } from "mongo";
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
    const topicId = await Topic.create({
      title,
      content,
      author_id: this.session.user.id,
      tags
    });

    return { id: topicId };
  }

  @Post("/topic/edit")
  async edit(
    @Param("id") id: string,
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
    await Topic.update({
      _id: ObjectId(id),
      title,
      content,
      author_id: this.session.user.id,
      tags
    });

    return { id };
  }

  @Get("/topic/delete/:id")
  async delete(@Param("id") id: string) {
    const user = this.session.user;
    if (!user) throw new Error("未登录");
    const topic = await Topic.findById(id);
    if (topic?.author_id !== user.id) throw new Error("你没有删除权限");
    await Topic.update({ _id: ObjectId(id), deleted: true });
    return { data: "success" };
  }

  @Get("/topic/:type")
  async list(
    @Param("type") type: "all" | "new" | "good" | "hot" | "cold" | "job",
    @Param("page") page: number = 1,
    @Param("size") size: number = 20
  ) {
    const topics = await Topic.find({});
    const total = 0;
    return {
      page,
      size,
      total,
      list: topics
    };
  }
}
