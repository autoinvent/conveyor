import { HTMLAttributes, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import { TableBody } from './TableBody';
import { TableBodyFallback } from './TableBodyFallback';
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
  ({ data, columnIds, children, ...props }: TableProps) => {
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
          className='bg-[--fg-color] table-auto border-collapse border border-[--border-color]'
          {...props}
        >
          {children === undefined ? (
            <>
              <TableHead />
              <TableBody />
              <TableBodyFallback />
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
    BodyFallback: TableBodyFallback,
    Cell: TableCell,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
