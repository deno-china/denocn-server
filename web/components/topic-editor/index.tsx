import { faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin, message } from 'antd';
import React, { Component } from 'react';
import Editor from '../editor';
import BasePanel from '../panels/base-panel';
import { TopicModel } from '../../models/topic';
import './index.less';

interface EditorState {
  content: string;
  title: string;
  type: string;
  loading: boolean;
}

interface EditorProps {
  onSave: (topic: { title: string; content: string; type: string }) => void;
  topic?: TopicModel;
  title: string;
}

export default class TopicEditor extends Component<EditorProps, EditorState> {
  state = {
    content: '',
    title: '',
    type: '分享',
    loading: false,
  };

  componentWillReceiveProps(props: EditorProps) {
    const topic: TopicModel = props.topic || {};
    // @ts-ignore
    this.setState({
      content: topic.content,
      title: topic.title,
      type: topic.type,
    });
  }

  async onSave() {
    if (!this.state.title || this.state.title.length < 10) {
      message.error('标题至少10个字符');
      return;
    }
    if (!this.state.content || this.state.content.length < 20) {
      message.error('内容至少20个字符');
      return;
    }

    try {
      this.setState({ loading: true });
      await this.props.onSave({
        title: this.state.title,
        content: this.state.content,
        type: this.state.type,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render(): JSX.Element {
    return (
      <Spin spinning={this.state.loading}>
        <BasePanel
          className="com-topic-editor"
          white
          header={(
            <>
              <h4>
                <FontAwesomeIcon className="icon" icon={faEdit} />
                {this.props.title}
              </h4>
              <button className="btn green" onClick={this.onSave.bind(this)}>
                提交
              </button>
            </>
          )}
        >
          <div className="form">
            <select
              placeholder="请选择分类"
              value={this.state.type}
              onChange={({ target }) => this.setState({ type: target.value })}
            >
              <option value="问答">问答</option>
              <option value="分享">分享</option>
              <option value="招聘">招聘</option>
            </select>

            <input
              type="text"
              placeholder="请输入标题"
              value={this.state.title}
              onChange={({ target }) => this.setState({ title: target.value })}
            />
          </div>

          <div className="tips">
            <FontAwesomeIcon icon={faInfoCircle} />
            可以粘贴上传图片
          </div>

          <Editor
            value={this.state.content}
            onChange={value => this.setState({ content: value })}
          />
        </BasePanel>
      </Spin>
    );
  }
}
