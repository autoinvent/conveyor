import { ComponentType, useEffect, useState } from 'react';
import { Table as RBTable } from 'react-bootstrap';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableBodyFallback } from './TableBodyFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps extends WrapperProp, CommonProps {
  columnIds: string[];
  data: DataType[];
  TableBodyFallbackComponent?: ComponentType;
}

export const Table = Object.assign(
  ({
    data,
    columnIds,
    TableBodyFallbackComponent = TableBodyFallback,
    children,
    id,
    className,
    style,
  }: TableProps) => {
    const isFirstRender = useIsFirstRender();
    const [tableStore] = useState(new Store<TableStore>({ data, columnIds }));

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

    return (
      <TableStoreContext.Provider value={tableStore}>
        <RBTable id={id} className={className} style={style} hover>
          {children === undefined ? (
            <>
              <TableHead />
              {data.length > 0 ? <TableBody /> : <TableBodyFallbackComponent />}
            </>
          ) : (
            children
          )}
        </RBTable>
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
