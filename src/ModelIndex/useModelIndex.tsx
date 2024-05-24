import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import type { StoreSelector } from '@/types';

import {
  type ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';

export const useModelIndex = (selector?: StoreSelector<ModelIndexStore>) => {
  const modelIndexStore = useContext(ModelIndexStoreContext);
  if (!modelIndexStore) {
    throw new Error(
      'useModelIndexStore must be used within ModelIndexStoreContext.Provider',
    );
  }
  const selected = selector ? useStore(modelIndexStore, selector) : undefined;

  const setModelIndex = (
    setState: (state: ModelIndexStore) => ModelIndexStore,
  ) => {
    modelIndexStore.setState(setState);
  };

  return { selected, setModelIndex };
};
