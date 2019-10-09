## Deno 中文社区后端部分

[![Build Status](https://github.com/manyuanrong/website/workflows/CI/badge.svg)](https://github.com/deno-china/website/actions)
![GitHub](https://img.shields.io/github/license/deno-china/website.svg)
[![(Deno)](https://img.shields.io/badge/deno-0.20.0-green.svg)](https://deno.land)
[![Website](https://img.shields.io/website/https/denocn.org.svg?up_message=startup)](https://denocn.org)

### 项目结构

```sh
├── Dockerfile
├── LICENSE
├── READEME.MD
├── common
│   ├── Reflect.ts
│   ├── base_controller.ts # 基础控制器类，所有Controller都要继承此类
│   ├── cookis.ts # Cookie中间件，实现Cookie操作
│   ├── json_result.ts # 封装返回数据为Json格式的中间件
│   ├── redis.ts # Redis连接模块
│   ├── session.ts # Session机制中间件，实现Session存储在Redis上
│   └── util.ts # 工具方法
├── config.ts # 网站配置文件
├── controller.ts # 控制器加载模块，所有controllers下的控制器都在这里导入（Deno等动态引入功能好了之后重构为自动载入）
├── controllers # 控制器目录
│   ├── home.ts
│   ├── topic.ts
│   └── user.ts
├── deps.ts # 外部依赖
├── id_rsa.enc # 加密之后的，用于持续部署访问服务器的Key
├── models # 数据库模型目录，所有模型都需要在main.ts中引入。
│   ├── main.ts
│   ├── reply.ts
│   ├── topic.ts
│   └── user.ts
├── server.ts # 应用入口模块
├── setup.ts # 执行环境初始化时的入口文件
├── test.ts # TODO 测试用例
└── tsconfig.json # TypeScript参数配置。
```

### 修改配置

配置全局环境变量，或者配置 `.env` 文件。参考 `.env.example` 文件

```sh
# 环境变量配置示例。请创建.env文件，将需要修改的项配置到.env文件中

MYSQL_HOST= #MySQL地址
MYSQL_PORT= #MySQL端口号
MYSQL_USER= #MySQL用户名
MYSQL_PASS= #MySQL数据库密码
MYSQL_DB= #MySQL数据库名
REDIS_PORT= #Reids端口
REDIS_HOST= #Redis服务地址
REDIS_PASS= #Redis密码
GITHUB_SECRET= #GitHub应用Secret
GITHUB_CLIENTID= #Github应用ID
GITHUB_REDIRECT= #Github登录回调地址
```


### 启动
```sh
deno -A -c tsconfig.json server.ts
```

### 技术栈和用到的库

项目采用 `deno` + `oak` + `dso` + `deno-redis`

https://github.com/manyuanrong/dso

https://github.com/oakserver/oak

https://github.com/keroxp/deno-redis