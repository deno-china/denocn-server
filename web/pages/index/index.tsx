import * as React from "react";
import DefaultLayout from "../../components/layouts/default";
import Pagination from "../../components/pagination";
import BasePanel from "../../components/panels/base-panel";
import FriendsLinkPanel from "../../components/panels/friends-link";
import QQGroupPanel from "../../components/panels/qq-group";
import { TopicModel } from "../../models/topic";
import "./index.less";
import Topic from "./_Topic";

const types = [
  { type: "all", title: "全部" },
  { type: "good", title: "精华" },
  { type: "new", title: "最新" },
  { type: "cold", title: "冷门" },
  { type: "job", title: "招聘" }
];

interface IndexPageProps {
  list: TopicModel[];
  total: number;
  size: number;
  page: number;
}

export default function IndexPage(props: IndexPageProps) {
  const { list, total, size, page } = props;
  return (
    <DefaultLayout
      sides={
        <>
          {/* <LoginUserPanel user={userStore.info} /> */}
          <FriendsLinkPanel />
          <QQGroupPanel />
        </>
      }
    >
      <div className="page-index">
        <BasePanel white className="topics" header={this.renderHeader()}>
          <ul className="list">
            {list.map(topic => (
              <Topic topic={topic} key={topic.id} />
            ))}
          </ul>
          <Pagination
            page={page}
            total={total}
            size={size}
            onChange={(page, size) => {}}
          />
        </BasePanel>
      </div>
    </DefaultLayout>
  );
}
