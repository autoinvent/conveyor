import { HTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Store } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import { TableBody } from './TableBody';
import { TableFallback } from './TableFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps
  extends TableStore,
    HTMLAttributes<HTMLTableElement> {}

export const Table = Object.assign(
  ({ data, columnIds, children, className, ...props }: TableProps) => {
    const [tableStore] = useState(new Store<TableStore>({ data, columnIds }));
    useStoreSetStateEffect({
      store: tableStore,
      setState: (state) => ({ ...state, columnIds }),
      deps: [columnIds],
    });
    useStoreSetStateEffect({
      store: tableStore,
      setState: (state) => ({ ...state, data }),
      deps: [data],
    });

    return (
      <TableStoreContext.Provider value={tableStore}>
        <table
          className={twMerge('bg-[--fg-color] table-auto rounded w-full border-separate border-spacing-0 relative overflow-x-auto mb-2 overflow-hidden transition-colors outline outline-1 outline-[--border-color] border-[--border-color]', className)}
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
