import { ObjectId } from "mongo";
import { MongoModel } from "./base.ts";

export class TopicSchema {
  type: "分享" | "问答" | "招聘" = "分享";
  title!: string;
  author_id!: ObjectId;
  content!: string;
  is_top: boolean = false; // 置顶
  is_good: boolean = false; // 精华
  is_lock: boolean = false; // 锁定
  reply_count: number = 0;
  view_count: number = 0;
  collect_count: number = 0;
  last_reply_id?: ObjectId;
  last_reply_time?: Date;
  tags?: string;
  deleted: boolean = false;
}

export const Topic = new MongoModel(TopicSchema, "topics");
