import { useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { WrapperProp } from '@/types';

import {
  LensType,
  LensesStore,
  LensesStoreContext,
} from './LensesStoreContext';

export interface LensesProps extends WrapperProp {
  activeLens: LensType;
  AvailableLenses?: Record<string, LensType>;
}

export const Lenses = ({
  activeLens,
  AvailableLenses = {},
  children,
}: LensesProps) => {
  const isFirstRender = useIsFirstRender();
  const [lensesStore] = useState(
    new Store<LensesStore>({ activeLens, AvailableLenses }),
  );
  useEffect(() => {
    if (!isFirstRender.current) {
      lensesStore.setState((state) => {
        return {
          ...state,
          activeLens,
        };
      });
    }
  }, [activeLens]);

  return (
    <LensesStoreContext.Provider value={lensesStore}>
      {children}
    </LensesStoreContext.Provider>
  );
};
