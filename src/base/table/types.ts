import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';
import { Table as DefaultTable } from './components/table';
import { TableHeader } from './components/table-header';
import { TableHeaderRow } from './components/table-header-row';
import { TableHead } from './components/table-head';
import { TableBody } from './components/table-body';
import { TableRow } from './components/table-row';
import { TableCell } from './components/table-cell';
import type { FC } from 'react';

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

export interface TableComponents<
  TTable extends TableComponent,
  THeader extends TableComponent,
  THeaderRow extends TableComponent,
  THead extends TableComponent,
  TBody extends TableComponent,
  TRow extends TableComponent,
  TCell extends TableComponent,
> {
  Table: TTable;
  Header: THeader;
  HeaderRow: THeaderRow;
  Head: THead;
  Body: TBody;
  Row: TRow;
  Cell: TCell;
}

export type TableComponent = FC<any>;

export type TableComponentWithTypes = <_TColumn, _TData>() => TableComponent;

export type TableStore = StoreApi<TableState<any, any>>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
