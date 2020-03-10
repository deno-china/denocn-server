import { ObjectId } from "mongo";
import {
  BaseController,
  Controller,
  Get,
  Param
} from "../common/base_controller.ts";
import { github } from "../config.ts";
import { User } from "../models/user.ts";

@Controller("/api/user")
export default class UserController extends BaseController {
  @Get("/login")
  async login(@Param("redirect") url: string = "/") {
    if (!this.ctx.state.session.user) {
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

  @Get("/logout")
  async logout() {
    this.ctx.state.session.user = null;
    this.redirect("/");
  }

  @Get("/github")
  async github(@Param("code") code: string, @Param("state") state: string) {
    const body = new URLSearchParams();
    body.append("client_id", github.clientId);
    body.append("client_secret", github.clientSecret);
    body.append("redirect_uri", github.redirectUri);
    body.append("code", code);
    body.append("state", state);
    let result = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    const params = new URLSearchParams(await result.text());
    const accessToken = params.get("access_token");

    result = await fetch(
      `https://api.github.com/user?access_token=${accessToken}`,
      { headers: { "User-Agent": "denocn agent" } }
    );

    const info = await result.json();
    let user = await User.findOne({ github_id: info.id });
    let userId: ObjectId;
    const userInfo: any = {
      github_id: info.id,
      github_name: info.login,
      name: info.login,
      github_token: accessToken,
      nick_name: info.name,
      location: info.location,
      avatar: `https://avatars1.githubusercontent.com/u/${info.id}?v=4`,
      email: info.email,
      company: info.company,
      home_page: info.blog,
      signature: info.bio
    };

    if (user) {
      userId = user._id;
      userInfo._id = 1;
      await User.update(userInfo);
    } else {
      user = await User.create(userInfo);
    }

    this.session.user = user;
    this.redirect(`/user/${user?._id.$oid}`);
  }

  @Get("/info/:id")
  async info(@Param("id") id: string) {
    const user = await User.findById(id);
    return { ...user, password: null, github_token: null };
  }

  @Get("/me")
  async me() {
    const user = this.ctx.state.session.user;
    return user || {};
  }
}
