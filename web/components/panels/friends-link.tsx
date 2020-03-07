import React, { FunctionComponent } from 'react';
import BasePanel from './base-panel';
import './friends-link.less';

const FriendsLinkPanel: FunctionComponent = () => (
  <BasePanel className="panel-friends-link" header="友情链接">
    <a href="https://cnodejs.org" target="_blank" rel="noopener noreferrer">
      <img src={require('../../assets/imgs/cnodejs.png')} alt="" />
    </a>
  </BasePanel>
);

export default FriendsLinkPanel;
