import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType, WrapperProp } from '@/types';

export interface Column {
  columnId: string;
  cell: ReactNode;
}

export interface TableType {
  data: DataType[];
  columns: Column[];
  rows: Record<string, number>;
}

export type TableStoreType = Store<TableType, (cb: TableType) => TableType>;

export const TableStoreContext = createContext<null | TableStoreType>(null);

export interface TableStoreProviderProps extends WrapperProp {
  data: DataType[];
}

export const TableStoreProvider = ({
  data,
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
      };
    });
  }, [data]);
  return (
    <TableStoreContext.Provider value={tableStore}>
      {children}
    </TableStoreContext.Provider>
  );
};
