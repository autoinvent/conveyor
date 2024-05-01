import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import {
  ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';

export const useModelIndex = (selector?: StoreSelector<ModelIndexStore>) => {
  const modelIndexStore = useContext(ModelIndexStoreContext);
  if (!modelIndexStore) {
    throw new Error(
      'useModelIndexStore must be used within ModelIndexStoreContext.Provider',
    );
  }

  const x = useStore(modelIndexStore, selector)
  const selected = selector ? x : undefined;

  const setModelIndex = (
    setState: (state: ModelIndexStore) => ModelIndexStore,
  ) => {
    modelIndexStore.setState(setState);
  };

  return { selected, setModelIndex };
};
