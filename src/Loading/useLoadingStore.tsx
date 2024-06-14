import { useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type LoadingState, LoadingStoreContext } from './LoadingStoreContext';

export function useLoadingStore(): LoadingState;
export function useLoadingStore<T>(selector: StoreSelector<LoadingState, T>): T;

export function useLoadingStore<T>(selector?: StoreSelector<LoadingState, T>) {
  const loadingStore = useContext(LoadingStoreContext);
  if (loadingStore === undefined) {
    throw new Error('useLoadingStore must be used within LoadingStoreProvider');
  }

  const selected = selector
    ? useStore(loadingStore, selector)
    : useStore(loadingStore);

  return selected;
}
