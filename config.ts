const {
  GITHUB_SECRET,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASS
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
  title: "Deno中文社区"
};

export const github = {
  clientId: "dc94ce9a00097582a7ee",
  clientSecret: GITHUB_SECRET,
  redirectUri: "https://www.denocn.org/user/github"
};
