import { ObjectId } from "mongo";
import { MongoModel } from "./base.ts";

export type TopicType = "分享" | "问答" | "招聘";
export class TopicSchema {
  _id!: ObjectId;
  type: TopicType = "分享";
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
  tags?: string[] = [];
  deleted: boolean = false;

  created_at?: Date = new Date();
  updated_at?: Date = new Date();
}

export const Topic = new MongoModel(TopicSchema, "topics");
