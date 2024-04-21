import { ReactNode, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import {
  LensType,
  LensesStore,
  LensesStoreContext,
} from './LensesStoreContext';

export interface LensesProps extends Partial<LensesStore> {
  activeLens: LensType;
  children?: ReactNode;
}

export const Lenses = ({
  activeLens,
  AvailableLenses = {},
  children,
}: LensesProps) => {
  const [lensesStore] = useState(
    new Store<LensesStore>({ activeLens, AvailableLenses }),
  );
  useStoreSetStateEffect({
    store: lensesStore,
    setState: (state) => ({ ...state, activeLens }),
    deps: [activeLens],
  });
  useStoreSetStateEffect({
    store: lensesStore,
    setState: (state) => ({ ...state, AvailableLenses }),
    deps: [AvailableLenses],
  });

  return (
    <LensesStoreContext.Provider value={lensesStore}>
      {children}
    </LensesStoreContext.Provider>
  );
};
