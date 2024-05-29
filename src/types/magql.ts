export type ID = string | number;

type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONObject 
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface SearchResult {
  type: string;
  id: ID;
  value: string;
  extra: JSONValue;
}

export interface CheckDeleteResult {
  affected?: SearchResult[];
  prevented?: SearchResult[];
  deleted?: SearchResult[];
}

export interface TableViewFilter {
  path: string;
  op: string;
  not?: boolean;
  value: JSONValue;
}

export interface TableView {
  filter?: TableViewFilter[][];
  sort?: string[];
  page?: number;
  per_page?: number;
}

export enum ScalarTypes {
  STRING = 'String',
  INT = 'Int',
  FLOAT = 'Float',
  DATETIME = 'DateTime',
  BOOLEAN = 'Boolean',
}

