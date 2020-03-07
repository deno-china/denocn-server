import { BaseModel, Defaults, dso, Field, FieldType, Model } from "dso";

@Model("topics")
export class TopicModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    length: 20,
    primary: true,
    autoIncrement: true
  })
  id!: number;

  @Field({ type: FieldType.STRING, length: 20, default: `"分享"` })
  type!: "分享" | "问答" | "招聘";

  @Field({ type: FieldType.STRING, length: 200 })
  title!: string;
  @Field({ type: FieldType.INT, length: 20 })
  author_id!: number;
  @Field({ type: FieldType.TEXT, length: 65535 })
  content!: string;
  @Field({ type: FieldType.BOOLEAN, default: false })
  is_top!: boolean; // 置顶
  @Field({ type: FieldType.BOOLEAN, default: false })
  is_good!: boolean; // 精华
  @Field({ type: FieldType.BOOLEAN, default: false })
  is_lock!: boolean; // 锁定
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  reply_count!: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  view_count!: number;
  @Field({ type: FieldType.INT, length: 10, default: 0 })
  collect_count!: number;
  @Field({ type: FieldType.INT, length: 20 })
  last_reply_id?: number;
  @Field({ type: FieldType.DATE, default: Defaults.CURRENT_TIMESTAMP })
  last_reply_time?: Date;

  @Field({ type: FieldType.STRING, length: 255 })
  tags?: string;
  @Field({ type: FieldType.BOOLEAN, default: false })
  deleted!: boolean;
}

export const Topic = dso.define(TopicModel);
