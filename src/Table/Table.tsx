import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDependencyStore } from '@/hooks';

import { TableBody } from './TableBody';
import { TableFallback } from './TableFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps extends TableStore, ComponentProps<'table'> { }

export const Table = Object.assign(
  ({ data, columnIds, children, className, ...props }: TableProps) => {
    const store = useDependencyStore<TableStore>({
      data,
      columnIds
    });

    return (
      <TableStoreContext.Provider value={store}>
        <table
          className={twMerge(
            'h-fit table-auto rounded w-full border-separate border-spacing-0 relative overflow-x-auto mb-2 overflow-hidden border-0',
            className,
          )}
          {...props}
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
      </TableStoreContext.Provider>
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
