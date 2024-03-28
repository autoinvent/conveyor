import { useEffect, useState } from 'react';
import { Table as RBTable } from 'react-bootstrap';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableBodyFallback } from './TableBodyFallback';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps extends WrapperProp, CommonProps {
  data: DataType[];
  columnIds: string[];
}

export const Table = Object.assign(
  ({ data, columnIds, children, id, className, style }: TableProps) => {
    const isFirstRender = useIsFirstRender();
    const [tableStore] = useState(new Store<TableStore>({ data, columnIds }));

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
          {children === undefined ?
            <>
              <TableHead />
              <TableBody />
              <TableBodyFallback />
            </> : children}
        </RBTable>
      </TableStoreContext.Provider>
    );
  },
  {
    Body: TableBody,
    BodyFallback: TableBodyFallback,
    Cell: TableCell,
    CellFallback: TableCellFallback,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
    RowFallback: TableRowFallback,
  },
);
