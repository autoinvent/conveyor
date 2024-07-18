import { type FieldValues, useFormContext } from 'react-hook-form';

import type { StoreSelector } from '@/types';

import type { FormState } from './FormStoreContext';

export function useFormStore<D extends FieldValues>(): FormState<D>;
export function useFormStore<T, D extends FieldValues>(
  selector: StoreSelector<FormState<D>, T>,
): T;

export function useFormStore<T, D extends FieldValues>(
  selector?: StoreSelector<FormState<D>, T>,
) {
  const methods = useFormContext<D>();

  const selected = selector ? selector(methods) : methods;

  return selected;
}
