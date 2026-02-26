export interface Link {
  id: string;
  alias: string;
  original_url: string;
  clicks: number;
  created_at: Date;
  updated_at: Date;
  last_accessed_at: Date | null;
}
