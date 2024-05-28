import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface TableState {
  columnIds: string[];
  data?: Record<string, any>;
}

export const TableStoreContext = createContext<
  StoreApi<TableState> | undefined
>(undefined);

export interface TableStoreProviderProps extends TableState {
  children?: ReactNode;
}
export const TableStoreProvider = ({
  columnIds,
  data,
  children,
}: TableStoreProviderProps) => {
  const store = useMemo(
    () =>
      createStore(
        immer<TableState>(() => ({
          columnIds,
          data,
        })),
      ),
    [columnIds, data],
  );
  return (
    <TableStoreContext.Provider value={store}>
      {children}
    </TableStoreContext.Provider>
  );
};
