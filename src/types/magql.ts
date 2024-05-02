export type ID = string

export interface SearchResult {
  type: string
  id: ID
  value: string
  extra: JSON
}

export interface CheckDeleteResult {
  affected: SearchResult[]
  prevented: SearchResult[]
  deleted: SearchResult[]
}

export interface TableViewFilter {
  path: string;
  op: string;
  not?: boolean;
  value: JSON;
}

export interface TableView {
  filter?: TableViewFilter[][];
  sort?: string[];
  page?: number;
  perPage?: number;
}
