import { useContext } from 'react';
import { useStore } from 'zustand';

import type { StoreSelector } from '@/types';

import {
  type ConveyorState,
  ConveyorStoreContext,
} from './ConveyorStoreContext';

export function useConveyorStore(): ConveyorState;
export function useConveyorStore<T>(
  selector: StoreSelector<ConveyorState, T>,
): T;

export function useConveyorStore<T>(
  selector?: StoreSelector<ConveyorState, T>,
) {
  const conveyorStore = useContext(ConveyorStoreContext);

  const selected = selector
    ? useStore(conveyorStore, selector)
    : useStore(conveyorStore);

  return selected;
}
