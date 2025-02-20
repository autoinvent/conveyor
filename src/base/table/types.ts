import type { Data } from '@/base/types';
import type { StoreApi } from 'zustand';

export interface TableState {
  columnIds: string[];
  data?: Data[];
}

export type TableStore = StoreApi<TableState>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
