import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import type { TableInternals, TableState, TableStore } from '../types';
import { createStore } from 'zustand';

export const TableContext = createContext<TableStore<any> | null>(null);

export interface TableProviderProps<TInternals extends TableInternals>
  extends PropsWithChildren<TableState<TInternals>> {}

export const TableProvider = <TInternals extends TableInternals>({
  columnIds,
  data,
  internals,
  layout,
  children,
}: TableProviderProps<TInternals>) => {
  const storeRef = useRef<TableStore<TInternals>>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<TableState<TInternals>>()(() => ({
      columnIds,
      data,
      internals,
      layout,
    }));
  }

  useEffect(() => {
    storeRef.current?.setState({ columnIds, data, internals, layout });
  }, [columnIds, data, internals, layout]);

  return <TableContext value={storeRef.current}>{children}</TableContext>;
};
