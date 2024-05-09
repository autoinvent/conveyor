import { ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

import {
  LensType,
  LensesStore,
  LensesStoreContext,
} from './LensesStoreContext';

export interface LensesProps extends Partial<LensesStore> {
  initialLens?: LensType;
  children?: ReactNode;
}

export const Lenses = ({
  initialLens,
  activeLens,
  AvailableLenses = {},
  children,
}: LensesProps) => {
  const [lensesStore] = useState(
    new Store<LensesStore>({
      activeLens: activeLens ?? initialLens,
      AvailableLenses,
    }),
  );

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current && activeLens !== undefined) {
      lensesStore.setState((state) => ({ ...state, activeLens }));
    }
  }, [activeLens]);

  return (
    <LensesStoreContext.Provider value={lensesStore}>
      {children}
    </LensesStoreContext.Provider>
  );
};
