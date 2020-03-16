import { assert } from "asserts";
import * as logger from "logger";
import { Application, HttpError, send, Status } from "oak";
import * as path from "path";
import { cookie } from "./common/cookis.ts";
import jsonResultConvertor from "./common/json_result.ts";
import "./common/mongo.ts";
import { render } from "./common/render.ts";
import { redisSession } from "./common/session.ts";
import { State } from "./common/state.ts";
import * as config from "./config.ts";
import initControllers from "./controller.ts";
const app = new Application<State>();
await logger.setup({});

// Error handler middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log("dddd");
    if (e instanceof HttpError) {
      context.response.status = e.status as any;
      if (e.expose) {
        context.response.body = await render(
          { url: "/error" },
          {
            title: `${e.status}`,
            error: e.message
          }
        );
      } else {
        context.response.body = await render(
          { url: "/error" },
          {
            title: `${e.status} - ${Status[e.status]}`
          }
        );
      }
    } else if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = await render(
        { url: "/error" },
        {
          title: "500 - Internal Server Error",
          error: `Unhandled Error: ${e.message}`
        }
      );
      logger.error(`Unhandled Error: ${e.message}`);
      logger.error(JSON.stringify(e.stack));
    }
  }
});

// Logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

app.use(cookie);
app.use(redisSession);
app.use(jsonResultConvertor);

await initControllers(app);

app.use(async ctx => {
  const requestPath = ctx.request.path;
  try {
    const resolvePath = await send(ctx, requestPath, {
      root: path.resolve(Deno.cwd(), `./public`)
    });
    assert(resolvePath);
  } catch (err) {
    ctx.response.body = await render({
      url: requestPath,
      search: ctx.request.search
    });
  }
});

const addr = `${config.startup.host}:${config.startup.port}`;
logger.info(`Server statup on ${addr}\n`);
await app.listen(addr);
