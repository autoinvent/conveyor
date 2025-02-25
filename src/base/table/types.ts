import type { FC } from 'react';

import type { StoreApi } from 'zustand';

import type { Data } from '@/base/types';

import type { TableBodyProps } from './components/table-body';
import type { TableCellProps } from './components/table-cell';
import type { TableRowProps } from './components/table-row';
import type { TableHeaderProps } from './components/table-header';
import type { TableHeaderRowProps } from './components/table-header-row';
import type { TableHeadProps } from './components/table-head';

export interface TableState<TInternals extends TableInternals> {
  columnIds: string[];
  data?: Data[];
  internals: TInternals;
  layout: FC<NoInfer<TInternals>>;
}

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

export type TableStore<TInternals extends TableInternals> = StoreApi<
  TableState<TInternals>
>;

export interface TableRowState {
  rowIndex: number;
}

export type TableRowStore = StoreApi<TableRowState>;
