import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import type { TableRowState, TableRowStore } from '../types';
import { createStore } from 'zustand';

export const TableRowContext = createContext<TableRowStore | null>(null);

export interface TableRowProviderProps
  extends PropsWithChildren<TableRowState> {}

export const TableRowProvider = ({
  rowIndex,
  children,
}: TableRowProviderProps) => {
  const storeRef = useRef<TableRowStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<TableRowState>()(() => ({ rowIndex }));
  }

  useEffect(() => {
    storeRef.current?.setState({ rowIndex });
  }, [rowIndex]);

  return <TableRowContext value={storeRef.current}>{children}</TableRowContext>;
};
