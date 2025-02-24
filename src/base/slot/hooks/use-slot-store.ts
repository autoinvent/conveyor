import { use } from 'react';

import { useStore } from 'zustand';

import { SlotsContext } from '../contexts/slot-context';
import type { SlotsState } from '../types';

export const useSlotsStore = <T>(selector: (state: SlotsState) => T): T => {
  const store = use(SlotsContext);
  if (!store) throw new Error('Missing SlotsContext in the tree.');
  return useStore(store, selector);
};
