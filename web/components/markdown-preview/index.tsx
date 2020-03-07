import React from 'react';
import Markdown from 'react-markdown';
import CodeRender from './code-render';
import './style.less';

interface IMarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FunctionComponent<
IMarkdownPreviewProps
> = props => (
  <Markdown
    className="com-markdown-preview"
    source={props.content}
    renderers={{ code: CodeRender }}
    escapeHtml={false}
  />
);

export default MarkdownPreview;
