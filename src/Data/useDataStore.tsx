import { useContext } from 'react';
import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import { DataStoreContext } from './DataStoreContext';

export function useDataStore<D extends DataType>(): D;
export function useDataStore<T, D extends DataType>(
  selector: StoreSelector<D, T>,
): T;

export function useDataStore<T, D extends DataType>(
  selector?: StoreSelector<D, T>,
) {
  const dataStore = useContext(DataStoreContext);
  if (dataStore === undefined) {
    throw new Error('useDataStore must be used within DataStoreProvider');
  }

  const selected = selector
    ? useStore(dataStore, selector)
    : useStore(dataStore);

  return selected;
}
