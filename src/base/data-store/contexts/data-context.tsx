import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import { createStore } from 'zustand';

import type { DataState, DataStore } from '../types';

export const DataContext = createContext<DataStore | null>(null);

export interface DataProviderProps extends PropsWithChildren<DataState> {}

export const DataProvider = ({ data, meta, children }: DataProviderProps) => {
  const storeRef = useRef<DataStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<DataState>()(() => ({ data, meta }));
  }

  useEffect(() => {
    storeRef.current?.setState({ data, meta });
  }, [data, meta]);

  return <DataContext value={storeRef.current}>{children}</DataContext>;
};
