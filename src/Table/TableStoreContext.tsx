import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType, WrapperProp } from '@/types';

export interface Column {
  id: string;
  visible?: boolean;
}

export interface TableType {
  data: DataType[];
  columns: Column[];
  rows: Record<string, number>; // Used to decide what row index belongs to a rowId
}

export type TableStoreType = Store<TableType, (cb: TableType) => TableType>;

export const TableStoreContext = createContext<null | TableStoreType>(null);

export interface TableStoreProviderProps extends WrapperProp {
  data: DataType[];
  columns: Column[];
}

export const TableStoreProvider = ({
  data,
  columns,
  children,
}: TableStoreProviderProps) => {
  const tableStore = useMemo(
    () => new Store<TableType>({ data: [], columns: [], rows: {} }),
    [],
  );
  useEffect(() => {
    tableStore.setState((state) => {
      return {
        ...state,
        data,
        rows: {},
      };
    });
  }, [data]);

  useEffect(() => {
    tableStore.setState((state) => {
      return {
        ...state,
        columns,
      };
    });
  }, [columns]);
  return (
    <TableStoreContext.Provider value={tableStore}>
      {children}
    </TableStoreContext.Provider>
  );
};
