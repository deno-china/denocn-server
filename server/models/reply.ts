import { ObjectId } from "mongo";
import { MongoModel } from "./base.ts";

export class ReplySchema {
  topic_id?: ObjectId;
  reply_to?: ObjectId;
  author_id!: ObjectId;
  content!: string;
  deleted: boolean = false;
}

export const Reply = new MongoModel(ReplySchema, "replies");
