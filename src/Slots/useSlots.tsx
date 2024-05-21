import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { SlotsStore, SlotsStoreContext } from './SlotsStoreContext';

export const useSlots = (selector?: StoreSelector<SlotsStore>) => {
  const slotsStore = useContext(SlotsStoreContext);
  if (slotsStore === undefined) {
    throw new Error(
      'useSlotsStore must be used within SlotStoreContext.Provider',
    );
  }

  const selected = selector ? useStore(slotsStore, selector) : undefined;

  const setSlots = (setState: (state: SlotsStore) => SlotsStore) => {
    slotsStore.setState(setState);
  };

  return { selected, setSlots };
};
