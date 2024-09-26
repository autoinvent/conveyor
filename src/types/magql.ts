export type ID = string | number;

type JSONValue = any;

export interface SearchResult {
  type: string;
  id: ID;
  value: string;
  extra?: JSONValue;
}

export interface CheckDeleteResult {
  affected?: SearchResult[];
  prevented?: SearchResult[];
  deleted?: SearchResult[];
}

export interface FilterItem {
  path: string;
  not?: boolean;
  op: string;
  value: JSONValue;
}

export interface TableView {
  filter?: FilterItem[][];
  sort?: string[];
  page?: number;
  perPage?: 5 | 10 | 25 | 50 | 100;
}

export enum ScalarType {
  ID = "ID",
  STRING = "String",
  INT = "Int",
  FLOAT = "Float",
  DATETIME = "DateTime",
  BOOLEAN = "Boolean",
}
