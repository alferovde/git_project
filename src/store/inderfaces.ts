export type dataGit = {
  id: number;
  name: string;
  language: string;
  forks: number;
  watchers: number;
  updated_at: string;
  license?: { name: string; spdx_id: string };
  description?: string;
};

export interface GitState {
  data: dataGit[];
  loading: boolean;
  error?: string;
  count: number;
}

export type PropsQuery = {
  query: Query;
  setQuery: any;
};

export type Query = {
  query: string;
  perPage: number;
  sort?: string;
  page: number;
};
export type dataGitPropd = {
  data: dataGit[];
};
