import { useContext } from 'react';
import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import {
  type ModelFormState,
  ModelFormStoreContext,
} from './ModelFormStoreContext';

export function useModelFormStore<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
>(): ModelFormState<D, F, DT, FT>;
export function useModelFormStore<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
  S,
>(selector: StoreSelector<ModelFormState<D, F, DT, FT>, S>): S;

export function useModelFormStore<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
  S,
>(selector?: StoreSelector<ModelFormState<D, F, DT, FT>, S>) {
  const modelFormStore = useContext(ModelFormStoreContext);
  if (modelFormStore === undefined) {
    throw new Error(
      'useModelFormStore must be used within ModelFormStoreProvider',
    );
  }

  const selected = selector
    ? useStore(modelFormStore, selector)
    : useStore(modelFormStore);

  return selected;
}
