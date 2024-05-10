import { ComponentProps, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

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
    const [tableStore] = useState(new Store<TableStore>({ data, columnIds }));

    const isFirstRender = useIsFirstRender();
    useEffect(() => {
      if (!isFirstRender.current) {
        tableStore.setState(() => ({ data, columnIds }));
      }
    }, [data, columnIds]);

    return (
      <TableStoreContext.Provider value={tableStore}>
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
