import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from 'react';

import { createStore } from 'zustand';

import type { TableState, TableStore } from '../types';
import type { Data } from '@/base/types';

export const TableContext = createContext<TableStore<any, any> | null>(null);

export interface TableProviderProps<
  TColumnIds extends string,
  TData extends Data,
> extends PropsWithChildren<TableState<TColumnIds, TData>> {}

export const TableProvider = <TColumnIds extends string, TData extends Data>({
  columnIds,
  data,
  components,
  children,
}: TableProviderProps<TColumnIds, TData>) => {
  const storeRef = useRef<TableStore<TColumnIds, TData>>(null);
  if (!storeRef.current) {
    storeRef.current = createStore<TableState<TColumnIds, TData>>()(() => ({
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
