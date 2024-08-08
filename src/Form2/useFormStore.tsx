import { useContext } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import { type FormState, FormStoreContext } from './FormStoreContext';

export function useFormStore<D extends FieldValues>(): FormState<D>;
export function useFormStore<D extends FieldValues, T>(
  selector: StoreSelector<FormState<D>, T>,
): T;

export function useFormStore<D extends FieldValues, T>(
  selector?: StoreSelector<FormState<D>, T>,
) {
  const formStore = useContext(FormStoreContext);
  if (formStore === undefined) {
    throw new Error('useFormStore must be used within FormStoreProvider');
  }

  const selected = selector
    ? useStore(formStore, selector)
    : useStore(formStore);

  return selected;
}
