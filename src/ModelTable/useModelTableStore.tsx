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
  DT extends D,
  FT extends F,
>(): ModelTableState<D, F, DT, FT>;
export function useModelTableStore<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
  S,
>(selector: StoreSelector<ModelTableState<D, F, DT, FT>, S>): S;

export function useModelTableStore<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
  S,
>(selector?: StoreSelector<ModelTableState<D, F, DT, FT>, S>) {
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
