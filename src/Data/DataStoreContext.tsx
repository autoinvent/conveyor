import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DataType } from '@/types';

export const DataStoreContext = createContext<StoreApi<any> | undefined>(
  undefined,
);

export interface DataStoreProviderProps<D extends DataType> {
  data: D;
  children?: ReactNode;
}
export const DataStoreProvider = <D extends DataType>({
  data,
  children,
}: DataStoreProviderProps<D>) => {
  const store = useMemo(() => createStore(immer(() => data)), [data]);
  return (
    <DataStoreContext.Provider value={store}>
      {children}
    </DataStoreContext.Provider>
  );
};
