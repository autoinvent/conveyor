import { useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type FormState, FormStoreContext } from './FormStoreContext';

export function useFormStore(): FormState;
export function useFormStore<T>(selector: StoreSelector<FormState, T>): T;

export function useFormStore<T>(selector?: StoreSelector<FormState, T>) {
  const formStore = useContext(FormStoreContext);
  if (formStore === undefined) {
    throw new Error('useFormStore must be used within FormStoreProvider');
  }

  const selected = selector
    ? useStore(formStore, selector)
    : useStore(formStore);

  return selected;
}
