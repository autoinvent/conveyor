import { useContext } from 'react';

import { ModelIndexStoreContext } from './ModelIndexStoreContext';

export const useModelIndexStore = () => {
  const modelIndexStore = useContext(ModelIndexStoreContext);
  if (!modelIndexStore)
    throw new Error(
      'useModelIndexStore must be used within ModelIndexStoreContext',
    );
  return modelIndexStore;
};
