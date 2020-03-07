import React from 'react';
import { Spin } from 'antd';

type Props = {}
const PageLoading: React.FunctionComponent<Props> = () => (
  <div style={{ paddingTop: '30%', textAlign: 'center', zIndex: 100 }}>
    <Spin size="large" tip="加载中..." />
  </div>
);
export default PageLoading;
