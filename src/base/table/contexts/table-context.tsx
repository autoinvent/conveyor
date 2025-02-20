import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import type { TableState, TableStore } from '../types';
import { createStore } from 'zustand';

export const TableContext = createContext<TableStore | null>(null);

export interface TableProviderProps extends PropsWithChildren<TableState> {}

export const TableProvider = ({
  columnIds,
  data,
  children,
}: TableProviderProps) => {
  const storeRef = useRef<TableStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<TableState>()(() => ({ columnIds, data }));
  }

  useEffect(() => {
    storeRef.current?.setState({ columnIds, data });
  }, [columnIds, data]);

  return <TableContext value={storeRef.current}>{children}</TableContext>;
};
