const { GITHUB_SECRET } = Deno.env();

// 数据配置
export const mysql = {
  hostname: "127.0.0.1",
  debug: false,
  username: "root",
  password: "",
  port: 3306,
  db: "denocn"
};

export const redis = {
  host: "127.0.0.1",
  port: 6379,
  password: ""
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
