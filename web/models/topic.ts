export interface TopicModel {
  created_at?: string;
  updated_at?: string;
  type?: '分享' | '问答' | '招聘';
  id?: number;
  title?: string;
  content?: string;
  tags?: string;
  author_id?: number;
  is_top?: boolean;
  is_good?: boolean;
  is_lock?: boolean;
  company?: string;
  view_count?: number;
  reply_count?: number;
  collect_count?: number;
  last_reply_id?: number;
  last_reply_time?: string;
  deleted?: boolean;
}
