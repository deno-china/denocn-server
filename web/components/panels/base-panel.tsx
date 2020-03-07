import { ReactElementLike } from 'prop-types';
import React, { FunctionComponent } from 'react';
import './base-panel.less';

interface basePanelProps {
  header?: ReactElementLike | string;
  white?: boolean;
  className?: string;
}

const BasePanel: FunctionComponent<basePanelProps> = (props) => {
  const cls = [
    'base-panel ',
    props.white ? 'base-panel-white' : '',
    props.className,
  ].join(' ');
  return (
    <div className={cls}>
      {props.header && <div className="header">{props.header}</div>}
      <div className="body">{props.children}</div>
    </div>
  );
};

export default BasePanel;
