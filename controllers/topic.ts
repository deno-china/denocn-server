import { BaseController, Controller, Get, Param } from "../common/base_controller.ts";
import { Topic } from "../models/topic.ts";

type TopicListFilter = "all" | "new" | "job" | "good" | "hot" | "cold";

@Controller("/topic")
class TopicController extends BaseController {
  @Get("/list")
  list(@Param("type") type: TopicListFilter = "all") {
    console.log("list", type);

    switch (type) {
    }
    // Topic.findAll(where);
    return type;
  }

  listAll() {
    return Topic.findAll({});
  }
}
