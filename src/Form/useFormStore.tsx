import { useFormContext } from 'react-hook-form';

import type { StoreSelector } from '@/types';

import type { FormState } from './FormStoreContext';

export function useFormStore(): FormState;
export function useFormStore<T>(selector: StoreSelector<FormState, T>): T;

export function useFormStore<T>(selector?: StoreSelector<FormState, T>) {
  const methods = useFormContext();

  const selected = selector ? selector(methods) : methods;

  return selected;
}
