import { Fragment, ReactNode, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import { SlotsStore, SlotsStoreContext } from './SlotsStoreContext';

export interface SlotsProps {
  slotOrder: string[];
  children?: ReactNode;
}

export const Slots = ({ slotOrder, children }: SlotsProps) => {
  const [slotsStore] = useState(() => {
    const slotEntries = slotOrder.map((slotKey) => [
      slotKey,
      { node: null, refIds: [] },
    ]);
    const slots = Object.fromEntries(slotEntries);
    return new Store<SlotsStore>({ slotOrder, slots });
  });

  const { slotOrder: slotKeys, slots } = useStore(slotsStore, (state) => state);

  useStoreSetStateEffect({
    store: slotsStore,
    setState: (state) => ({ ...state, slotOrder }),
    deps: [slotOrder],
  });

  return (
    <SlotsStoreContext.Provider value={slotsStore}>
      {slotKeys.map((slotKey, index) => {
        return (
          <Fragment key={`${slotKey}-${index}`}>{slots[slotKey].node}</Fragment>
        );
      })}
      {children}
    </SlotsStoreContext.Provider>
  );
};
