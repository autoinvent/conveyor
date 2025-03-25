import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';
import { Table as DefaultTable } from './components/table';
import { TableHeader } from './components/table-header';
import { TableHeaderRow } from './components/table-header-row';
import { TableHead } from './components/table-head';
import { TableBody } from './components/table-body';
import { TableRow } from './components/table-row';
import { TableCell } from './components/table-cell';
import type { ReactNode } from 'react';

export const DEFAULT_TABLE_COMPONENTS = {
  Table: DefaultTable,
  Header: TableHeader,
  HeaderRow: TableHeaderRow,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
};

export interface TableState<TColumn extends string, TData extends Data> {
  columns: readonly TColumn[];
  columnOrder: NoInfer<TColumn[]>;
  data: TData[];
  components: any;
}

export type TableComponents = Partial<
  Record<keyof typeof DEFAULT_TABLE_COMPONENTS, TableComponent>
> &
  Record<string, TableComponent>;

export type TableComponent = <_TColumn extends string, _TData extends Data>(
  p: any,
) => ReactNode;

export type TableStore = StoreApi<TableState<any, any>>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
