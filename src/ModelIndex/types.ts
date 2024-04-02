import { DataType } from '@/types';

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

export interface ActionsConfig {
  onDelete?: (rowData: DataType) => Promise<any>;
  onSave?: (rowData: DataType) => Promise<any>;
  showActions?: boolean;
}
