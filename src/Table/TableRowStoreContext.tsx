import { createContext, useMemo } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType, WrapperProp } from '@/types';

export type TableRowStoreType = Store<DataType, (cb: DataType) => DataType>;

export const TableRowStoreContext = createContext<null | TableRowStoreType>(
  null,
);

export interface TableRowStoreProviderProps extends WrapperProp {
  rowData: DataType;
}

export const TableRowStoreProvider = ({
  rowData,
  children,
}: TableRowStoreProviderProps) => {
  const tableRowStore = useMemo(() => new Store<DataType>(rowData), [rowData]);
  return (
    <TableRowStoreContext.Provider value={tableRowStore}>
      {children}
    </TableRowStoreContext.Provider>
  );
};
