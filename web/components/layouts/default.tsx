import * as React from "react";
import Footer from "../footer";
import Header from "../header";
import "./default.less";

interface DefaultLayoutProps {
  sides?: JSX.Element;
  header?: JSX.Element;
  children?: JSX.Element;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { sides, children } = props;
  return (
    <div className="layout-default">
      <Header />
      <div id="main-wrapper">
        <div className="content">{children}</div>
        {sides && <div className="side">{sides}</div>}
      </div>
      <Footer />
    </div>
  );
}
