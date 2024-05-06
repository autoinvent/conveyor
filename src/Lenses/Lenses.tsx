import { ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

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

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      lensesStore.setState(() => ({ activeLens, AvailableLenses }));
    }
  }, [activeLens, AvailableLenses]);

  return (
    <LensesStoreContext.Provider value={lensesStore}>
      {children}
    </LensesStoreContext.Provider>
  );
};
