import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type DataType = Record<string, any>;

export const DataStoreContext = createContext<StoreApi<DataType> | undefined>(
  undefined,
);

export interface DataStoreProviderProps {
  data: DataType;
  children?: ReactNode;
}
export const DataStoreProvider = ({
  data,
  children,
}: DataStoreProviderProps) => {
  const store = useMemo(() => createStore(immer<DataType>(() => data)), [data]);
  return (
    <DataStoreContext.Provider value={store}>
      {children}
    </DataStoreContext.Provider>
  );
};
