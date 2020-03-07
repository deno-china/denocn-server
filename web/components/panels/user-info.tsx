import React, { FunctionComponent } from 'react';
import Link from 'umi/link';
import { UserModel } from '../../models/user';
import BasePanel from './base-panel';
import './user-info.less';

interface userInfoPanelProps {
  user: UserModel;
  mySelf?: boolean;
  title?: string;
}

const UserInfoPanel: FunctionComponent<userInfoPanelProps> = (props) => {
  if (!props.user) return null;
  return (
    <BasePanel className="panel-user-info" header={props.title || '用户'}>
      <Link to={props.mySelf ? '/user/profile' : `/user/${props.user.id}`}>
        <img src={props.user.avatar} alt="" />
      </Link>
      <div style={{ float: 'left' }}>
        <Link
          to={props.mySelf ? '/user/profile' : `/user/${props.user.id}`}
          className="name"
        >
          {props.user.nick_name}
        </Link>
        <div className="score">
          积分:
          {' '}
          <span>{props.user.score}</span>
        </div>
      </div>
      <div className="bio">{props.user.signature}</div>
    </BasePanel>
  );
};

export default UserInfoPanel;
