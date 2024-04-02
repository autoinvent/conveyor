import { useContext } from 'react';

import { LoadingStoreContext } from './LoadingStoreContext';

export const useLoadingStore = () => {
  const loadingStore = useContext(LoadingStoreContext);
  if (!loadingStore)
    throw new Error('useLoadingStore must be used within LoadingStoreContext');
  return loadingStore;
};
