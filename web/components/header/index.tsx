import React, { FunctionComponent } from "react";
import Link from "umi/link";
import logo from "../../assets/imgs/logo.svg";
import "./index.less";

const Header: FunctionComponent = () => (
  <header>
    <div className="inner">
      <a href="/" className="logo">
        <img src={logo} alt="logo" />
        <span>DENO中文社区</span>
      </a>

      <nav>
        <Link to="/">首页</Link>
        <Link to="/getting-start">新手入门</Link>
        <a href="https://deno.land/" target="_blank" rel="noopener noreferrer">
          官网
        </a>
        <Link to="/about">关于</Link>
        {/* {userStore.info && userStore.info.id ? (
          <a href="/api/user/logout">退出</a>
        ) : (
          <a href="/api/user/login">登录</a>
        )} */}
      </nav>
    </div>
  </header>
);

export default Header;
