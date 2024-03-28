import { useContext } from 'react';

import { LensesStoreContext } from './LensesStoreContext';

export const useLensesStore = () => {
  const lensesStore = useContext(LensesStoreContext);
  if (lensesStore === undefined)
    throw new Error(
      'useLenses must be used within LensesStoreContext.Provider',
    );
  return lensesStore;
};
