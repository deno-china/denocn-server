import { BaseModel, dso, Field, FieldType, Model } from "../deps.ts";

@Model("topics")
class TopicModel extends BaseModel<TopicModel> {
  @Field({
    type: FieldType.INT,
    length: 20,
    primary: true,
    autoIncrement: true
  })
  id: number;
  @Field({ type: FieldType.STRING, length: 200 })
  title: string;
  @Field({ type: FieldType.INT, length: 20 })
  authorId: number;
  @Field({ type: FieldType.TEXT, length: 65535 })
  content: string;
  @Field({ type: FieldType.BOOLEAN, default: false })
  isTop: boolean; // 置顶
  @Field({ type: FieldType.BOOLEAN, default: false })
  isGood: boolean; // 精华
  @Field({ type: FieldType.BOOLEAN, default: false })
  isLock: boolean; // 锁定
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  replyCount: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  viewCount: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  collectCount: number;
  @Field({ type: FieldType.INT, length: 20 })
  lastReplyId: number;
  @Field({ type: FieldType.STRING, length: 255 })
  tags: string;
  @Field({ type: FieldType.BOOLEAN, default: false })
  deleted: boolean;
}

export const Topic = new TopicModel();
dso.define(Topic);
