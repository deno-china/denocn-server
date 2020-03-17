import { ObjectId } from "mongo";
import { MongoModel } from "./base.ts";

export class UserSchema {
  _id!: ObjectId;
  name!: string;
  nick_name!: string;
  password?: string;
  email?: string;
  home_page?: string;
  avatar?: string;
  location?: string;
  signature?: string;
  company?: string;

  github_id?: string;
  github_name?: string;
  github_token?: string;

  level?: string;
  score: number = 0;

  created_at?: Date = new Date();
}

export const User = new MongoModel(UserSchema, "users");
