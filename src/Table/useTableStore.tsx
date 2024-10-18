import { useContext } from 'react';

import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import { type TableState, TableStoreContext } from './TableStoreContext';

export function useTableStore<D extends DataType>(): TableState<D>;
export function useTableStore<D extends DataType, T>(
  selector: StoreSelector<TableState<D>, T>,
): T;

export function useTableStore<D extends DataType, T>(
  selector?: StoreSelector<TableState<D>, T>,
) {
  const tableStore = useContext(TableStoreContext);
  if (tableStore === undefined) {
    throw new Error('useTableStore must be used within TableStoreProvider');
  }

  const selected = selector
    ? useStore(tableStore, selector)
    : useStore(tableStore);

  return selected;
}
