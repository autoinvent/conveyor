import type { FC, ReactNode } from 'react';

import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';

import type { TableBodyProps } from './components/table-body';
import type { TableCellProps } from './components/table-cell';
import type { TableHeadProps } from './components/table-head';
import type { TableHeaderProps } from './components/table-header';
import type { TableHeaderRowProps } from './components/table-header-row';
import type { TableRowProps } from './components/table-row';

export interface TableState<TColumnIds extends string, TData extends Data> {
  columnIds: TColumnIds[];
  data?: TData[];
  components: Record<string, TableComponent>;
}

export type TableStore<
  TColumnIds extends string,
  TData extends Data,
> = StoreApi<TableState<TColumnIds, TData>>;

export type TableComponent = <
  _TColumnId extends string,
  _TData extends Record<string, any>,
>(
  p: any,
) => ReactNode;

export interface TableInternals
  extends Record<string, FC<any>>,
    DefaultTableInternals {}

export interface DefaultTableInternals {
  TableHeader: FC<TableHeaderProps>;
  TableHeaderRow: FC<TableHeaderRowProps>;
  TableHead: FC<TableHeadProps>;
  TableBody: FC<TableBodyProps>;
  TableRow: FC<TableRowProps>;
  TableCell: FC<TableCellProps>;
}

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
