export interface UserModel {
  created_at?: string;
  updated_at?: string;
  id?: number;
  name?: string;
  nick_name?: string;
  password?: string;
  email?: string;
  home_page?: string;
  avatar?: string;
  location?: string;
  signature?: string;
  company?: string;
  github_id?: string;
  github_name?: string;
  github_token?: string;
  topic_count?: number;
  reply_count?: number;
  follower_count?: number;
  following_count?: number;
  level?: string;
  score?: number;
}
