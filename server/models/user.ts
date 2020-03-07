import { BaseModel, dso, Field, FieldType, Model } from "dso";

@Model("users")
export class UserModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    length: 20,
    primary: true,
    autoIncrement: true
  })
  id!: number;
  @Field({ type: FieldType.STRING, length: 50 })
  name!: string;
  @Field({ type: FieldType.STRING, length: 50 })
  nick_name!: string;
  @Field({ type: FieldType.STRING, length: 100 })
  password!: string;
  @Field({ type: FieldType.STRING, length: 100 })
  email?: string;
  @Field({ type: FieldType.STRING, length: 100 })
  home_page?: string;
  @Field({ type: FieldType.STRING, length: 255 })
  avatar!: string;
  @Field({ type: FieldType.STRING, length: 100 })
  location?: string;
  @Field({ type: FieldType.STRING, length: 200 })
  signature?: string;
  @Field({ type: FieldType.STRING, length: 100 })
  company?: string;

  @Field({ type: FieldType.STRING, length: 50 })
  github_id!: string;
  @Field({ type: FieldType.STRING, length: 50 })
  github_name!: string;
  @Field({ type: FieldType.STRING, length: 100 })
  github_token!: string;

  @Field({ type: FieldType.INT, length: 10, default: 0 })
  topicCount!: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  reply_count!: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  follower_count!: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  following_count!: number;
  @Field({ type: FieldType.STRING, length: 50 })
  level!: string;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  score!: number;
}

export const User = dso.define(UserModel);
