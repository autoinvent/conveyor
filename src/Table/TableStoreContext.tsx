import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DataType } from '@/types';

export interface TableState<D extends DataType> {
  columnIds: string[];
  data?: D[];
}

export const TableStoreContext = createContext<
  StoreApi<TableState<any>> | undefined
>(undefined);

export interface TableStoreProviderProps<D extends DataType>
  extends TableState<D> {
  children?: ReactNode;
}
export const TableStoreProvider = <D extends DataType>({
  children,
  ...tableState
}: TableStoreProviderProps<D>) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: entire states are used
  const store = useMemo(
    () => createStore(immer<TableState<D>>(() => ({ ...tableState }))),
    Object.values(tableState),
  );
  return (
    <TableStoreContext.Provider value={store}>
      {children}
    </TableStoreContext.Provider>
  );
};
