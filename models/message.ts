import { dso } from "../deps.ts";

const { define, FieldTypes } = dso;

export const Topic = define("topics", {
    id: { type: FieldTypes.INT, length: 20, primary: true, autoIncrement: true },
    title: { type: FieldTypes.STRING, length: 200 },
    authorId: { type: FieldTypes.INT, length: 20 },
    content: { type: FieldTypes.TEXT, length: 65535 },
    isTop: { type: FieldTypes.BOOLEAN, default: false }, // 置顶
    isGood: { type: FieldTypes.BOOLEAN, default: false }, // 精华
    isLock: { type: FieldTypes.BOOLEAN, default: false }, // 锁定
    replyCount: { type: FieldTypes.INT, length: 10, default: 0 },
    viewCount: { type: FieldTypes.INT, length: 10, default: 0 },
    collectCount: { type: FieldTypes.INT, length: 10, default: 0 },
    lastReplyId: { type: FieldTypes.INT, length: 20 },
    tags: { type: FieldTypes.STRING, length: 255 },
    deleted: { type: FieldTypes.BOOLEAN, default: false },
});