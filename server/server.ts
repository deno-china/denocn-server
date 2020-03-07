import * as logger from "logger";
import { Application, HttpError, send, Status } from "oak";
import * as path from "path";
import { cookie } from "./common/cookis.ts";
import jsonResultConvertor from "./common/json_result.ts";
import "./common/mongo.ts";
import { redisSession } from "./common/session.ts";
import { State } from "./common/state.ts";
import * as config from "./config.ts";
import initControllers from "./controller.ts";
import { connect } from "./models/main.ts";

const app = new Application<State>();
await logger.setup({});

// Error handler middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      context.response.status = e.status as any;
      if (e.expose) {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${e.message}</h1>
              </body>
            </html>`;
      } else {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${Status[e.status]}</h1>
              </body>
            </html>`;
      }
    } else if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>500 - Internal Server Error</h1>
              </body>
            </html>`;
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
await connect();

app.use(async ctx => {
  console.log(ctx.request.path);
  await send(ctx, ctx.request.path, {
    root: path.resolve(Deno.cwd(), `../public`),
    index: "index.html"
  });
});

const addr = `${config.startup.host}:${config.startup.port}`;
logger.info(`Server statup on ${addr}\n`);
await app.listen(addr);
