import { BaseController } from "../common/base_controller.ts";
import { github } from "../config.ts";
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
    this.redirect(url);
  }

  async logout() {
    this.ctx.state.session.user = null;
    this.redirect("/");
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
    const userInfo: any = {
      githubId: info.id,
      githubName: info.login,
      name: info.login,
      githubToken: accessToken,
      nickName: info.name,
      location: info.location,
      avatar: `https://avatars1.githubusercontent.com/u/${info.id}?v=4`,
      email: info.email,
      company: info.company,
      homePage: info.blog,
      signature: info.bio
    };

    if (user) {
      userId = user.id;
      userInfo.id = 1;
      await User.update(userInfo);
    } else {
      userId = (await User.insert(userInfo)) as number;
    }

    user = await User.findById(userId);
    session.user = user;
    this.redirect(`/user/${user.id}`);
  }

  async profile() {
    const name = this.ctx.params.name;
    console.log(name);
    const user: any = await User.findOne({ name });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
