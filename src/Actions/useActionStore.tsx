import { useContext } from 'react';

import { useStore } from 'zustand';

import type { DataType, StoreSelector } from '@/types';

import { type ActionState, ActionStoreContext } from './ActionContext';

export function useActionStore<D extends DataType>(): ActionState<D>;
export function useActionStore<D extends DataType, T>(
  selector: StoreSelector<ActionState<D>, T>,
): T;

export function useActionStore<D extends DataType, T>(
  selector?: StoreSelector<ActionState<D>, T>,
) {
  const actionStore = useContext(ActionStoreContext);
  if (actionStore === undefined) {
    throw new Error('useActionStore must be used within ActionStoreProvider');
  }

  const selected = selector
    ? useStore(actionStore, selector)
    : useStore(actionStore);

  return selected;
}
