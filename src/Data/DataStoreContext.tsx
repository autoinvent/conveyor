import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type StoreApi, createStore } from 'zustand';

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
  const [store] = useState(() => createStore(() => data));
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) store.setState(() => data);
  }, [data, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <DataStoreContext.Provider value={store}>
      {children}
    </DataStoreContext.Provider>
  );
};
