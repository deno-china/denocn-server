export interface ReplyModel {
  content: string;
  created_at: string;
  deleted: boolean;
  id: number;
  reply_to: number;
  topic_id: number;
  updated_at: string;
}
