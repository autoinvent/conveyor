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
  per_page?: number;
}
