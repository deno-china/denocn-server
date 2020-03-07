import 'highlight.js/styles/github.css';
import React, { FunctionComponent } from 'react';
import ReactHighlight from 'react-highlight';

interface ICodeRenderProps {
  language: string;
  value: string;
}

const CodeRender: FunctionComponent<ICodeRenderProps> = props => (
  <ReactHighlight className={props.language}>{props.value}</ReactHighlight>
);

export default CodeRender;
