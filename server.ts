import { router } from "./common/base_controller.ts";
import { cookie } from "./common/cookis.ts";
import jsonResultConvertor from "./common/json_result.ts";
import { connectRedis } from "./common/redis.ts";
import { redisSession } from "./common/session.ts";
import * as config from "./config.ts";
import initControllers from "./controller.ts";
import { Application, colors, HttpError, send, Status } from "./deps.ts";
import { connect as connectDb } from "./models/main.ts";
const { cwd } = Deno;

interface State {
  cookies: Map<string, string>;
  session: any;
}

const app = new Application<State>();

async function init() {
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
        console.log("Unhandled Error:", colors.red(colors.bold(e.message)));
        console.log(e.stack);
      }
    }
  });

  // Logger
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });

  app.use(cookie);
  app.use(redisSession);

  app.use(jsonResultConvertor);

  initControllers(app);

  app.use(async ctx => {
    console.log(ctx.request.path);
    await send(ctx, ctx.request.path, {
      root: `${cwd()}/public`,
      index: "index.html"
    });
  });
}

async function main() {
  await connectDb();
  await connectRedis();
  await init();
  try {
    const addr = `${config.startup.host}:${config.startup.port}`;
    console.info(`Server statup on ${addr}\n`);
    await app.listen(addr);
  } catch (error) {
    console.error(error);
  }
}

main();
