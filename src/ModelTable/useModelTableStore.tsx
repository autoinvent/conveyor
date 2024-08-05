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
>(): ModelTableState<D, F>;
export function useModelTableStore<D extends DataType, F extends string, T>(
  selector: StoreSelector<ModelTableState<D, F>, T>,
): T;

export function useModelTableStore<D extends DataType, F extends string, T>(
  selector?: StoreSelector<ModelTableState<D, F>, T>,
) {
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
