import { useContext } from 'react';

import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type SlotsState, SlotsStoreContext } from './SlotsStoreContext';

export function useSlotsStore(): SlotsState;
export function useSlotsStore<T>(selector: StoreSelector<SlotsState, T>): T;

export function useSlotsStore<T>(selector?: StoreSelector<SlotsState, T>) {
  const slotsStore = useContext(SlotsStoreContext);
  if (slotsStore === undefined) {
    throw new Error('useSlotsStore must be used within SlotsStoreProvider');
  }

  const selected = selector
    ? useStore(slotsStore, selector)
    : useStore(slotsStore);

  return selected;
}
