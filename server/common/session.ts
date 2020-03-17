import { assert } from "asserts";
import { ObjectId } from "mongo";
import { Context } from "oak";
import { MongoModel, WithId } from "../models/base.ts";
import { UserSchema } from "../models/user.ts";
import { State } from "./state.ts";

const SESSION_KEY = "oaksessionid";
const EXPIRE = 60 * 60 * 24; // one day

export class SessionSchema {
  user?: UserSchema;
  updated_at?: Date;
}

const SessionModel = new MongoModel(SessionSchema, "sessions");

export async function redisSession(
  ctx: Context<State>,
  next: () => Promise<void>
) {
  let sessionId: ObjectId;
  let session: (SessionSchema & WithId) | null;
  try {
    sessionId = ObjectId(ctx.state.cookies.get(SESSION_KEY) || "");
    session = await SessionModel.findById(sessionId);
    assert(session);
  } catch (err) {
    session = await SessionModel.create({ user: undefined });
    sessionId = session._id!;
    const cookie = `${SESSION_KEY}=${sessionId.$oid}; Path=/; HttpOnly`;
    ctx.response.headers.append(`Set-Cookie`, cookie);
  }
  ctx.state.session = session;
  await next();
  await SessionModel.update({ ...session, updated_at: new Date() });
}
