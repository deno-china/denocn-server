import {
  BaseController,
  Controller,
  Get,
  Param
} from "../common/base_controller.ts";
import { isSpider } from "../common/util.ts";
import { website } from "../config.ts";
import { Order, Join, QueryOptions, Template, Where, Marked } from "../deps.ts";
import { Reply } from "../models/reply.ts";
import { Topic } from "../models/topic.ts";
import { User } from "../models/user.ts";

const decoder = new TextDecoder();

interface Li {
  title: string;
  link: string;
}

const html = new Template(
  decoder.decode(Deno.readFileSync("./assets/html.tmpl"))
);

function render(options: { title?: string; body: string | string[] }) {
  if (options.body instanceof Array) options.body = options.body.join("\n");
  return html.render({
    title: options.title || website.title,
    body: options.body,
    description: website.description
  });
}

function listHtml(list: Li[]) {
  return [
    "<ul>",
    ...list.map(item => {
      if (
        !item.link.startsWith("https://") &&
        !item.link.startsWith("http://")
      ) {
        item.link = website.domain + item.link;
      }
      return `<li><a href="${item.link}">${item.title}</a></li>`;
    }),
    "</ul>"
  ].join("\n");
}

@Controller("/seo")
class SeoController extends BaseController {
  @Get("/detail/:id")
  async topicDetail(@Param("id") id: number) {
    if (!isSpider(this.ctx)) {
      return this.redirect("/detail/" + id);
    }
    const topic = await Topic.findById(id);
    const user = await User.findById(topic.author_id);
    const replies = await Reply.findAll({
      fields: ["replies.*", "users.nick_name"],
      join: [Join.left("users").on("users.id", "replies.author_id")],
      where: Where.field("topic_id").eq(id)
    });

    return render({
      title: topic.title,
      body: [
        user ? Marked(`### 作者：${user.nick_name}`) : "",
        `<article><h1>${topic.title}</h1>${Marked(topic.content)}</article>`,
        ...replies.map(reply => {
          return Marked(`### ${reply["nick_name"]}\n` + reply.content);
        })
      ]
    });
  }

  @Get("")
  async home() {
    if (!isSpider(this.ctx)) {
      return this.redirect("/");
    }
    const nav = listHtml([{ title: "话题", link: "/seo/topics?page=1" }]);
    return render({
      body: nav
    });
  }

  @Get("/topics")
  async topics(
    @Param("page") page: number = 1,
    @Param("size") size: number = 30
  ) {
    if (!isSpider(this.ctx)) {
      return this.redirect(`/?page=${page}`);
    }
    const options: QueryOptions = {
      fields: ["title", "id", "author_id"],
      order: [
        Order.by("topics.updated_at").desc,
        Order.by("topics.created_at").desc
      ],
      limit: [(page - 1) * size, size]
    };
    const { total = 0 } = (await Topic.findOne({
      ...options,
      fields: ["COUNT(*) AS total"],
      order: []
    })) as any;
    const topics = await Topic.findAll(options);

    // 分页导航
    const nav: Li[] = [];
    if (page > 1) {
      nav.push({ title: "上一页", link: "/seo/topics?page=1" });
    }
    if (page < total / size) {
      nav.push({ title: "下一页", link: "/seo/topics?page=" + (page + 1) });
    }

    return render({
      body: [
        listHtml(nav),
        listHtml(
          topics.map(topic => {
            return { title: topic.title, link: `/seo/detail/${topic.id}` };
          })
        )
      ]
    });
  }
}
