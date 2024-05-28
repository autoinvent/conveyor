import { useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type DataType, DataStoreContext } from './DataStoreContext';

export function useDataStore(): DataType;
export function useDataStore<T>(selector: StoreSelector<DataType, T>): T;

export function useDataStore<T>(selector?: StoreSelector<DataType, T>) {
  const dataStore = useContext(DataStoreContext);
  if (dataStore === undefined) {
    throw new Error('useDataStore must be used within DataStoreProvider');
  }

  const selected = selector
    ? useStore(dataStore, selector)
    : useStore(dataStore);

  return selected;
}
