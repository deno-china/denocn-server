import "https://deno.land/x/dotenv@v0.2.3/load.ts";

const {
  GITHUB_SECRET,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASS,
  GITHUB_CLIENTID,
  GITHUB_REDIRECT
} = Deno.env();

// 数据配置
export const mysql = {
  hostname: MYSQL_HOST || "127.0.0.1",
  debug: false,
  username: MYSQL_USER || "root",
  password: MYSQL_PASS || "",
  port: MYSQL_PORT ? parseInt(MYSQL_PORT) : 3306,
  db: MYSQL_DB || "denocn"
};

export const redis = {
  host: REDIS_HOST || "127.0.0.1",
  port: REDIS_PORT ? parseInt(REDIS_PORT) : 6379,
  password: REDIS_PASS || ""
};

// Web启动配置
export const startup = {
  host: "0.0.0.0",
  port: 3000
};

export const website = {
  title: "DENOCN: Deno中文社区 | Deno中国",
  description:
    "DENOCN 社区为国内最专业的 Deno 开源技术社区，致力于 Deno 技术学习与研究。",
  domain: "https://denocn.org"
};

export const github = {
  clientId: GITHUB_CLIENTID || "32503fcf79dea41e69af",
  clientSecret: GITHUB_SECRET || "7f861c6aa9385e910fdf5b680792a442ee3f3ca2",
  redirectUri: GITHUB_REDIRECT || "http://127.0.0.1:8000/api/user/github"
};

export const smtp = {
  server: ""
};
