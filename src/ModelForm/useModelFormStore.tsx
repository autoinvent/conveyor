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
>(): ModelFormState<D, F>;
export function useModelFormStore<D extends DataType, F extends string, T>(
  selector: StoreSelector<ModelFormState<D, F>, T>,
): T;

export function useModelFormStore<D extends DataType, F extends string, T>(
  selector?: StoreSelector<ModelFormState<D, F>, T>,
) {
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
