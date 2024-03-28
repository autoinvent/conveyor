import { useEffect, useState } from 'react';
import { Table as RBTable } from 'react-bootstrap';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableStoreContext } from './TableStoreContext';

export interface TableProps extends WrapperProp, CommonProps {
  data: DataType[];
  columnIds: string[];
}

export const Table = Object.assign(
  ({ data, columnIds, children, id, className, style }: TableProps) => {
    const isFirstRender = useIsFirstRender();
    const [tableStore] = useState(new Store({ data, columnIds }));

    useEffect(() => {
      if (!isFirstRender.current) {
        tableStore.setState((state) => {
          return {
            ...state,
            data,
          };
        });
      }
    }, [data]);

    useEffect(() => {
      if (!isFirstRender.current) {
        tableStore.setState((state) => {
          return {
            ...state,
            columnIds,
          };
        });
      }
    }, [columnIds]);

    return (
      <TableStoreContext.Provider value={tableStore}>
        <RBTable id={id} className={className} style={style} hover>
          {children}
        </RBTable>
      </TableStoreContext.Provider>
    );
  },
  {
    Body: TableBody,
    Cell: TableCell,
    CellFallback: TableCellFallback,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
    RowFallback: TableRowFallback,
  },
);
