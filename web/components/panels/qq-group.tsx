import React, { FunctionComponent } from 'react';
import BasePanel from './base-panel';
import './qq-group.less';

const QQGroupPanel: FunctionComponent = () => (
  <BasePanel white className="panel-qq-group" header="QQ交流群">
    <a
      target="_blank"
      href="//shang.qq.com/wpa/qunwpa?idkey=af2cdd32b1bb0dbc9583d7153fa7059645d6152ba47ce662edff277cbad0de95"
      rel="noopener noreferrer"
    >
      <img
        src={require('../../assets/imgs/qq-group.png')}
        alt="Deno研究社"
        title="Deno研究社"
      />
      <span>点击加群：698469316</span>
    </a>
  </BasePanel>
);

export default QQGroupPanel;
