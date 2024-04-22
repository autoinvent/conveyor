import { ComponentType, HTMLAttributes, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { Slots } from '@/Slots';
import { useStoreSetStateEffect } from '@/hooks';

import { TableBody } from './TableBody';
import { TableBodyFallback } from './TableBodyFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  columnIds: string[];
  data: DataType[];
  TableBodyFallbackComponent?: ComponentType;
}

export const Table = Object.assign(
  ({ data, columnIds, children, ...props }: TableProps) => {
    const [slotOrder] = useState([]);
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
        <table {...props}>
          <Slots slotOrder={slotOrder}>
            {children === undefined ? (
              <>
                <TableHead />
                <TableBody />
                <TableBodyFallback />
              </>
            ) : (
              children
            )}
          </Slots>
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
