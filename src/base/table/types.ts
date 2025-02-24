import type { Data } from '@/base/types';
import type { FC } from 'react';
import type { StoreApi } from 'zustand';
import type { TableCellProps } from './components/table-cell';
import type { TableRowProps } from './components/table-row';
import type { TableBodyProps } from './components/table-body';

export interface TableState<TInternals extends TableInternals> {
  columnIds: string[];
  data?: Data[];
  internals: TInternals;
  layout: FC<NoInfer<TInternals>>;
}

// export type TableInternals = Record<string, ComponentType>;
export interface TableInternals extends Record<string, FC<any>> {
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
