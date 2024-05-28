import { useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type TableState, TableStoreContext } from './TableStoreContext';

export function useTableStore(): TableState;
export function useTableStore<T>(selector: StoreSelector<TableState, T>): T;

export function useTableStore<T>(selector?: StoreSelector<TableState, T>) {
  const tableStore = useContext(TableStoreContext);
  if (tableStore === undefined) {
    throw new Error('useTableStore must be used within TableStoreProvider');
  }

  const selected = selector
    ? useStore(tableStore, selector)
    : useStore(tableStore);

  return selected;
}
