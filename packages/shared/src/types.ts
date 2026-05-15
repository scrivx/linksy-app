export interface CreateLinkInput {
  url: string;
  alias: string;
}

export interface LinkDTO {
  id: string;
  alias: string;
  original_url: string;
  clicks: number;
  created_at: string;
  updated_at: string;
  last_accessed_at: string | null;
}

export interface CreateLinkResponse {
  shortUrl: string;
  data: LinkDTO;
}

export interface LinkStatsResponse {
  alias: string;
  clicks: number;
  last_accessed_at: string | null;
  created_at: string;
}

export type ApiValidationIssue = { path: (string | number)[]; message: string };

export interface ApiErrorResponse {
  error: string | ApiValidationIssue[];
}
