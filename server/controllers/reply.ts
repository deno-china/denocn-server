import { ObjectId } from "https://deno.land/x/mongo@v0.4.0/ts/types.ts";
import {
  BaseController,
  Controller,
  Get,
  Param,
  Post
} from "../common/base_controller.ts";
import { lookupUser } from "../common/query-util.ts";
import { Reply, ReplySchema } from "../models/reply.ts";
import { Topic } from "../models/topic.ts";
@Controller("/api/reply")
class ReplyController extends BaseController {
  @Get("/list/:topicId")
  async list(
    @Param("topicId") topicId: string,
    @Param("size") size: number = 10,
    @Param("page") page: number
  ) {
    const replies: ReplySchema[] = await Reply.aggregate([
      {
        $match: {
          topic_id: ObjectId(topicId)
        }
      },
      lookupUser("author_id", "author"),
      { $unwind: "$author" }
    ]);

    return {
      list: replies,
      total: replies.length,
      page,
      size
    };
  }

  @Post("/add")
  async add(
    @Param("topic_id") topicId: string,
    @Param("content") content: string,
    @Param("reply_to") replyTo: string
  ) {
    const topic = await Topic.findById(topicId);
    if (!this.session.user) throw new Error("用户未登录");
    if (!topic) throw new Error("主题不存在");

    const reply = await Reply.create({
      author_id: this.session.user._id,
      topic_id: topic._id,
      content,
      reply_to: replyTo ? ObjectId(replyTo) : undefined
    });

    Topic.update({
      _id: ObjectId(topicId),
      last_reply_id: reply._id,
      last_reply_time: new Date(),
      reply_count: topic.reply_count + 1
    });

    return reply;
  }
}
