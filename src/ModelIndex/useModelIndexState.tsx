import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types'

import { ModelIndexStore, ModelIndexStoreContext } from './ModelIndexStoreContext';

export const useModelIndexState = (selector?: StoreSelector<ModelIndexStore>) => {
  const modelIndexStore = useContext(ModelIndexStoreContext);
  if (!modelIndexStore) {
    throw new Error(
      'useModelIndexStore must be used within ModelIndexStoreContext.Provider',
    );
  }

  const modelIndex = selector ? useStore(modelIndexStore, selector) : undefined
  const setModelIndex = (setState: (state: ModelIndexStore) => ModelIndexStore) => {
    modelIndexStore.setState(setState)
  }
  return [modelIndex, setModelIndex];
};
