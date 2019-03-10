import { BaseController } from "../common/base_controller.ts";
import { github } from "../config.ts";
import { Status } from "../deps.ts";
import { User } from "../models/user.ts";

export default class UserController extends BaseController {
  async login() {
    let url = "";
    if (this.ctx.state.session.user) {
      url = this.ctx.request.searchParams.get("redirect") || "/";
    } else {
      const state = Math.round(Date.now() * Math.random());
      url =
        `https://github.com/login/oauth/authorize` +
        `?scope=user&allow_signup=true` +
        `&client_id=${github.clientId}` +
        `&state=${state}` +
        `&redirect_uri=${github.redirectUri}`;
    }
    this.ctx.response.headers.append("Location", url);
    this.ctx.response.status = Status.Found;
  }

  async github() {
    const code = this.ctx.request.searchParams.get("code");
    const state = this.ctx.request.searchParams.get("state");
    let result = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `client_id=${github.clientId}&client_secret=${github.clientSecret}` +
        `&redirect_uri=${github.redirectUri}&code=${code}&state=${state}`
    });
    const params = new URLSearchParams(await result.text());
    const accessToken = params.get("access_token");

    result = await fetch(
      `https://api.github.com/user?access_token=${accessToken}`,
      { headers: { "User-Agent": "denocn agent" } }
    );

    const info = await result.json();
    const { session } = this.ctx.state;
    let user = await User.findOne({ githubId: info.id });
    let userId: number;

    if (user) {
      userId = user.id;
      await User.update({
        id: user.id,
        githubId: info.id,
        githubName: info.login,
        githubToken: accessToken,
        nickName: info.name,
        location: info.location,
        avatar: info.avatar_url,
        email: info.email,
        company: info.company,
        homePage: info.blog,
        signature: info.bio
      });
    } else {
      userId = await User.insert({
        githubId: info.id,
        githubName: info.login,
        name: info.login,
        githubToken: accessToken,
        nickName: info.name,
        location: info.location,
        avatar: info.avatar_url,
        email: info.email,
        company: info.company,
        homePage: info.blog,
        signature: info.bio
      }) as number;
    }

    user = await User.findById(userId);
    session.user = user;
    this.ctx.response.body = user;
  }
}
