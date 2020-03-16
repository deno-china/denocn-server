import { ObjectId } from "mongo";
import { MongoModel } from "./base.ts";

export class ReplySchema {
  topic_id?: ObjectId;
  reply_to?: ObjectId;
  author_id!: ObjectId;
  content!: string;
  deleted: boolean = false;

  created_at?: Date = new Date();
  updated_at?: Date = new Date();
}

export const Reply = new MongoModel(ReplySchema, "replies");
