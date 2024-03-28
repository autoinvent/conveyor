import { Fragment, useEffect, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { WrapperProp } from '@/types';

import { SlotsStore, SlotsStoreContext } from './SlotsStoreContext';

export interface SlotsProps extends WrapperProp {
  slotOrder: string[];
}

export const Slots = ({ slotOrder, children }: SlotsProps) => {
  const isFirstRender = useIsFirstRender();
  const [slotsStore] = useState(() => {
    const slotEntries = slotOrder.map((slotKey) => [
      slotKey,
      { node: null, slotIds: [] },
    ]);
    const slots = Object.fromEntries(slotEntries);
    return new Store<SlotsStore>({ slotOrder, slots });
  });

  const { slotOrder: slotKeys, slots } = useStore(slotsStore, (state) => state);

  useEffect(() => {
    if (isFirstRender) {
      slotsStore.setState((state) => {
        return {
          ...state,
          slotOrder,
        };
      });
    }
  }, [slotOrder]);

  return (
    <SlotsStoreContext.Provider value={slotsStore}>
      {slotKeys.map((slotKey, index) => {
        return <Fragment key={`${slotKey}-${index}`}>{slots[slotKey].node}</Fragment>;
      })}
      {children}
    </SlotsStoreContext.Provider>
  );
};
