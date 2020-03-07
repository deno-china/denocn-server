/**
 * 基础Controller类。支持路径映射、自动参数注入，自动参数类型转换
 *
 * ```ts
 * @Controller("/test")
 * class Test extends BaseController {
 * @Post("/test")
 * @Get("/test")
 * test(
 *   @Param("name") name: string,
 *   @Param("time") date: Date,
 *   @Param("show") show: boolean,
 *   @Param("num") num: number
 * ) {
 *   return { name, date, show, num };
 *  }
 * }
 * ```
 */

import { Router, RouterContext, Status } from "oak";
import { renderToString } from "./react.tsx";
import "./Reflect.ts";
import { State } from "./state.ts";
import { getAllRequestParams } from "./util.ts";

export const router = new Router();

function registerRoute(
  method: string,
  path: string,
  controller: BaseController,
  actionName: string,
  interceptor?: (ctx: RouterContext, params: any) => Promise<boolean>
) {
  (router as any)[method](path, async (ctx: RouterContext) => {
    controller.ctx = ctx as any;

    // 获取方法参数信息
    const params: any[] =
      Reflect.getMetadata("http:params", controller, actionName) || [];

    const extraParams =
      Reflect.getMetadata(`http:extra`, controller, actionName) || {};

    // 获取请求参数
    const requestParams = {
      ...extraParams,
      ...(await getAllRequestParams(ctx))
    };

    // 转换参数类型，填充参数值
    const data = params.map(({ name, type }) => {
      const val: string = requestParams[name];
      const Type = type;
      if (type === String) {
        return val;
      } else if (type === Boolean) {
        if (!val) {
          requestParams[name] = false;
        } else {
          requestParams[name] =
            val.toLowerCase() !== "false" && val.toLowerCase() !== "0";
        }
        return requestParams[name];
      } else if (!val) {
        return undefined;
      } else if (type === Number) {
        requestParams[name] = new Number(val).valueOf();
        return requestParams[name];
      } else {
        requestParams[name] = new Type(val);
        return requestParams[name];
      }
    });

    const canNext = interceptor ? await interceptor(ctx, requestParams) : true;
    // 调用action
    if (canNext) {
      const action = (controller as any)[actionName];
      return await action.call(controller, ...(data || []));
    }
  });
}

export class BaseController {
  public ctx!: RouterContext<any, State>;
  get session(): any {
    return this.ctx.state.session;
  }
  get cookies() {
    return this.ctx.state.cookies;
  }
  redirect(url: string) {
    this.ctx.response.headers.append("Location", url);
    this.ctx.response.status = Status.Found;
  }
  render(view: any, data?: Object) {
    return renderToString(view);
  }
}

interface ControllerConstructor {
  new (): BaseController;
}

// Controller 装饰器
export function Controller(
  parentPath: string = "",
  interceptor?: (ctx: RouterContext, params: any) => Promise<boolean>
) {
  return function<T extends ControllerConstructor>(target: T) {
    const _target = target.prototype;
    console.log("\nRegister Controller:", target.name);
    const register = (method: string) => {
      const meta = Reflect.getMetadata(`http:method:${method}`, _target) || {};
      for (const actionPath of Reflect.ownKeys(meta) as string[]) {
        const path = parentPath + actionPath;
        console.log(
          method.toUpperCase(),
          path,
          "=>",
          `${target.name}.${meta[actionPath]}`
        );
        registerRoute(method, path, _target, meta[actionPath], interceptor);
      }
    };
    register("get");
    register("post");
  };
}

// Controller http action 装饰器
export function httpMethod(method: string, url: string, params?: any) {
  return function(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const meta = Reflect.getMetadata(`http:method:${method}`, target) || {};
    meta[url] = methodName;
    Reflect.defineMetadata(`http:method:${method}`, meta, target);
    Reflect.defineMetadata(`http:extra`, params, target, methodName);
  };
}

// Controller get action 装饰器
export function Get(url: string, params?: any) {
  return httpMethod("get", url, params);
}

// Controller post action 装饰器
export function Post(url: string, params?: any) {
  return httpMethod("post", url, params);
}

// Action 参数装饰器
export function Param(name: string) {
  return (target: any, methodName: string, propertyIndex: number) => {
    const meta = Reflect.getMetadata("http:params", target, methodName) || [];
    const types = Reflect.getMetadata("design:paramtypes", target, methodName);
    meta[propertyIndex] = { name, type: types[propertyIndex] };
    Reflect.defineMetadata("http:params", meta, target, methodName);
  };
}
