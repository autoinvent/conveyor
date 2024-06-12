import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataType } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableFallback } from './TableFallback';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { type TableState, TableStoreProvider } from './TableStoreContext';

export interface TableProps<D extends DataType>
  extends TableState<D>,
    ComponentProps<'table'> {}

export const Table = Object.assign(
  <D extends DataType>({
    columnIds,
    data,
    children,
    className,
    ...htmlProps
  }: TableProps<D>) => {
    return (
      <TableStoreProvider columnIds={columnIds} data={data}>
        <table
          className={twMerge(
            'h-fit w-full table-auto border-collapse cursor-default rounded',
            className,
          )}
          {...htmlProps}
        >
          {children === undefined ? (
            <>
              <TableHead />
              <TableBody />
              <TableFallback />
            </>
          ) : (
            children
          )}
        </table>
      </TableStoreProvider>
    );
  },
  {
    Body: TableBody,
    Fallback: TableFallback,
    Cell: TableCell,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
