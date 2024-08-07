import { useContext } from 'react';
import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import {
  type ModelTableState,
  ModelTableStoreContext,
} from './ModelTableStoreContext';

export function useModelTableStore<
  D extends DataType,
  F extends string,
  T extends F,
>(): ModelTableState<D, F, T>;
export function useModelTableStore<
  D extends DataType,
  F extends string,
  T extends F,
  S,
>(selector: StoreSelector<ModelTableState<D, F, T>, S>): S;

export function useModelTableStore<
  D extends DataType,
  F extends string,
  T extends F,
  S,
>(selector?: StoreSelector<ModelTableState<D, F, T>, S>) {
  const modelTableStore = useContext(ModelTableStoreContext);
  if (modelTableStore === undefined) {
    throw new Error(
      'useModelTableStore must be used within ModelTableStoreProvider',
    );
  }

  const selected = selector
    ? useStore(modelTableStore, selector)
    : useStore(modelTableStore);

  return selected;
}
