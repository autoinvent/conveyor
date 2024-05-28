import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { TableBody } from './TableBody';
import { TableFallback } from './TableFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { type TableState, TableStoreProvider } from './TableStoreContext';

export interface TableProps extends TableState, ComponentProps<'table'> {}

export const Table = Object.assign(
  ({ columnIds, data, children, className, ...htmlProps }: TableProps) => {
    return (
      <TableStoreProvider columnIds={columnIds} data={data}>
        <table
          className={twMerge(
            'relative h-fit w-full table-auto border-collapse cursor-default overflow-hidden rounded',
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
