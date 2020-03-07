import React, { FunctionComponent } from 'react';
import './index.less';

const Footer: FunctionComponent = () => (
  <footer>
    <div className="inner">
      <a className="source" href="https://github.com/deno-china/website">
        源码地址
      </a>
      <div className="desc">
        DENOCN 社区为国内最专业的 Deno 开源技术社区，致力于 Deno
        技术学习与研究。
      </div>
      <div className="sponsor">目前还没有赞助商，服务器建在香港阿里云。</div>
    </div>
  </footer>
);

export default Footer;
