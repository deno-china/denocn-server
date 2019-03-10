import { dso } from "../deps.ts";

const { define, FieldTypes } = dso;

export const User = define("users", {
  id: { type: FieldTypes.INT, length: 20, primary: true, autoIncrement: true },
  name: { type: FieldTypes.STRING, length: 50 },
  nickName: { type: FieldTypes.STRING, length: 50 },
  password: { type: FieldTypes.STRING, length: 100 },
  email: { type: FieldTypes.STRING, length: 100 },
  homePage: { type: FieldTypes.STRING, length: 100 },
  avatar: { type: FieldTypes.STRING, length: 255 },
  location: { type: FieldTypes.STRING, length: 100 },
  signature: { type: FieldTypes.STRING, length: 200 },
  company: { type: FieldTypes.STRING, length: 100 },

  githubId: { type: FieldTypes.STRING, length: 50 },
  githubName: { type: FieldTypes.STRING, length: 50 },
  githubToken: { type: FieldTypes.STRING, length: 100 },

  topicCount: { type: FieldTypes.INT, length: 10, default: 0 },
  replyCount: { type: FieldTypes.INT, length: 10, default: 0 },
  followerCount: { type: FieldTypes.INT, length: 10, default: 0 },
  followingCount: { type: FieldTypes.INT, length: 10, default: 0 },
  level: { type: FieldTypes.STRING, length: 50 },
  score: { type: FieldTypes.INT, length: 10 }
});
