import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import { createStore } from 'zustand';

import type { TableState, TableStore } from '../types';

export const TableContext = createContext<TableStore | null>(null);

export interface TableProviderProps extends PropsWithChildren<TableState> {}

export const TableProvider = ({
  columnIds,
  data,
  components,
  children,
}: TableProviderProps) => {
  const storeRef = useRef<TableStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<TableState>()(() => ({
      columnIds,
      data,
      components,
    }));
  }

  useEffect(() => {
    storeRef.current?.setState({ columnIds, data, components });
  }, [columnIds, data, components]);

  return <TableContext value={storeRef.current}>{children}</TableContext>;
};
