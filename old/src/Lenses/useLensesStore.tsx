import { useContext } from 'react';

import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type LensesState, LensesStoreContext } from './LensesStoreContext';

export function useLensesStore(): LensesState;
export function useLensesStore<T>(selector: StoreSelector<LensesState, T>): T;

export function useLensesStore<T>(selector?: StoreSelector<LensesState, T>) {
  const lensesStore = useContext(LensesStoreContext);
  if (lensesStore === undefined) {
    throw new Error('useLensesStore must be used within LensesStoreProvider');
  }

  const selected = selector
    ? useStore(lensesStore, selector)
    : useStore(lensesStore);

  return selected;
}
