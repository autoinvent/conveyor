import { useContext } from 'react';
import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import {
  type ModelIndexState,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';

export function useModelIndexStore<D extends DataType>(): ModelIndexState<D>;
export function useModelIndexStore<T, D extends DataType>(
  selector: StoreSelector<ModelIndexState<D>, T>,
): T;

export function useModelIndexStore<T, D extends DataType>(
  selector?: StoreSelector<ModelIndexState<D>, T>,
) {
  const modelIndexStore = useContext(ModelIndexStoreContext);
  if (modelIndexStore === undefined) {
    throw new Error(
      'useModelIndexStore must be used within ModelIndexStoreProvider',
    );
  }

  const selected = selector
    ? useStore(modelIndexStore, selector)
    : useStore(modelIndexStore);

  return selected;
}
