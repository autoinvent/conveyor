import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { LensType, LensesStoreContext } from './LensesStoreContext';

export const useLenses = () => {
  const lensesStore = useContext(LensesStoreContext);
  if (lensesStore === undefined)
    throw new Error(
      'useLenses must be used within LensesStoreContext.Provider',
    );

  const state = useStore(lensesStore, (state) => state);

  const setLens = (newLens: LensType) =>
    lensesStore.setState((state) => {
      return {
        ...state,
        activeLens: newLens,
      };
    });

  return { ...state, setLens };
};
