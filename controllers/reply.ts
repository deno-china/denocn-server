import {
  BaseController,
  Controller,
  Get,
  Param,
  Post
} from "../common/base_controller.ts";
import { dso, Join, Order, QueryOptions, Where } from "../deps.ts";
import { Reply, ReplyModel } from "../models/reply.ts";
import { Topic, TopicModel } from "../models/topic.ts";

@Controller("/reply")
class ReplyController extends BaseController {
  @Get("/list/:topicId")
  async list(
    @Param("topicId") topicId: number,
    @Param("size") size: number = 10,
    @Param("page") page: number
  ) {
    const options: QueryOptions = {
      fields: [
        "replies.*",
        "users.nick_name as author_nick_name",
        "users.avatar as author_avatar"
      ],
      join: [Join.left("users").on("replies.author_id", "users.id")],
      where: Where.field("replies.topic_id").eq(topicId),
      order: [Order.by("replies.created_at").asc],
      limit: page ? [(page - 1) * size, size] : null
    };

    const replies = await Reply.findAll(options);

    let total = 0;
    if (page) {
      const result = (await Reply.findOne({
        ...options,
        fields: ["COUNT(*) AS total"],
        order: null,
        join: null
      })) as { total: number };
      total = result.total;
    } else {
      total = replies.length;
    }

    return {
      list: replies,
      total,
      page,
      size
    };
  }

  @Post("/add")
  async add(
    @Param("topic_id") topicId: number,
    @Param("content") content: string,
    @Param("reply_to") replyTo: number
  ) {
    const topic = await Topic.findById(topicId);
    if (!this.session.user) throw new Error("用户未登录");
    if (!topic) throw new Error("主题不存在");

    const replyId = await dso.transaction<number>(async trans => {
      const replyModel = trans.getModel(ReplyModel);
      const topicModel = trans.getModel(TopicModel);
      const id = await replyModel.insert({
        author_id: this.session.user.id,
        topic_id: topic.id,
        content,
        reply_to: replyTo
      });
      await topicModel.update({
        id: topicId,
        last_reply_time: new Date(),
        reply_count: topic.reply_count + 1,
        last_reply_id: id,
        
      });
      return id;
    });

    return { id: replyId };
  }
}
