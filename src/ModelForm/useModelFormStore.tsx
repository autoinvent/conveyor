import { useContext } from 'react';
import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import {
  type ModelFormState,
  ModelFormStoreContext,
} from './ModelFormStoreContext';

export function useModelFormStore<D extends DataType>(): ModelFormState<D>;
export function useModelFormStore<T, D extends DataType>(
  selector: StoreSelector<ModelFormState<D>, T>,
): T;

export function useModelFormStore<T, D extends DataType>(
  selector?: StoreSelector<ModelFormState<D>, T>,
) {
  const modelIndexStore = useContext(ModelFormStoreContext);
  if (modelIndexStore === undefined) {
    throw new Error(
      'useModelFormStore must be used within ModelFormStoreProvider',
    );
  }

  const selected = selector
    ? useStore(modelIndexStore, selector)
    : useStore(modelIndexStore);

  return selected;
}
