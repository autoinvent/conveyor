import { Fragment, ReactNode, useEffect, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

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

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      slotsStore.setState((state) => ({ ...state, slotOrder }));
    }
  }, [slotOrder]);

  return (
    <SlotsStoreContext.Provider value={slotsStore}>
      {slotKeys.map((slotKey) => {
        return <Fragment key={slotKey}>{slots[slotKey]?.node}</Fragment>;
      })}
      {children}
    </SlotsStoreContext.Provider>
  );
};
