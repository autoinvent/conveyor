export type ID = string;

export type JSONType = string | number | boolean | null | Object

export interface SearchResult {
  type: string;
  id: ID;
  value: string;
  extra: JSONType;
}

export interface CheckDeleteResult {
  affected: SearchResult[];
  prevented: SearchResult[];
  deleted: SearchResult[];
}

export interface TableViewFilter {
  path: string;
  op: string;
  not?: boolean;
  value: JSONType;
}

export interface TableView {
  filter?: TableViewFilter[][];
  sort?: string[];
  page?: number;
  perPage?: number;
}
