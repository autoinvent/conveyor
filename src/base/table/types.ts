import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';
import { Table as DefaultTable } from './components/table';
import { TableHeader } from './components/table-header';
import { TableHeaderRow } from './components/table-header-row';
import { TableHead } from './components/table-head';
import { TableBody } from './components/table-body';
import { TableRow } from './components/table-row';
import { TableCell } from './components/table-cell';
import type { FC, ReactNode } from 'react';

export const DEFAULT_TABLE_COMPONENTS = {
  Table: <_TColumn, _TData>() => DefaultTable,
  Header: <_TColumn, _TData>() => TableHeader,
  HeaderRow: <_TColumn, _TData>() => TableHeaderRow,
  Head: <_TColumn, _TData>() => TableHead,
  Body: <_TColumn, _TData>() => TableBody,
  Row: <_TColumn, _TData>() => TableRow,
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
  Table: () => TTable;
  Header: () => THeader;
  HeaderRow: () => THeaderRow;
  Head: () => THead;
  Body: () => TBody;
  Row: () => TRow;
  Cell: () => TCell;
}

export type TableComponents = Partial<
  Record<keyof typeof DEFAULT_TABLE_COMPONENTS, TableComponent>
>;

export type TableComponent = (p: any) => ReactNode;

export type TableComponentWithTypes = <_TColumn, _TData>() => TableComponent;

export type TableStore = StoreApi<TableState<any, any>>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
