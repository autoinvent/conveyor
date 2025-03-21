import type { FC } from 'react';

import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';

export interface TableState {
  columnIds: string[];
  data?: Data[];
  components: Record<string, TableComponent>;
}

export type TableStore = StoreApi<TableState>;

export type TableComponent = FC<any>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
