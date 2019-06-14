import { BaseModel, dso, Field, FieldType, Model } from "../deps.ts";

@Model("users")
class UserModel extends BaseModel<UserModel> {
  @Field({
    type: FieldType.INT,
    length: 20,
    primary: true,
    autoIncrement: true
  })
  id: number;
  @Field({ type: FieldType.STRING, length: 50 })
  name: string;
  @Field({ type: FieldType.STRING, length: 50 })
  nickName: string;
  @Field({ type: FieldType.STRING, length: 100 })
  password: string;
  @Field({ type: FieldType.STRING, length: 100 })
  email: string;
  @Field({ type: FieldType.STRING, length: 100 })
  homePage: string;
  @Field({ type: FieldType.STRING, length: 255 })
  avatar: string;
  @Field({ type: FieldType.STRING, length: 100 })
  location: string;
  @Field({ type: FieldType.STRING, length: 200 })
  signature: string;
  @Field({ type: FieldType.STRING, length: 100 })
  company: string;

  @Field({ type: FieldType.STRING, length: 50 })
  githubId: string;
  @Field({ type: FieldType.STRING, length: 50 })
  githubName: string;
  @Field({ type: FieldType.STRING, length: 100 })
  githubToken: string;

  @Field({ type: FieldType.INT, length: 10, default: 0 })
  topicCount: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  replyCount: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  followerCount: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  followingCount: number;
  @Field({ type: FieldType.STRING, length: 50 })
  level: string;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  score: number;
}

export const User = new UserModel();
dso.define(User);
