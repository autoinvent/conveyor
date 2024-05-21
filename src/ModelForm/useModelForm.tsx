import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { ModelFormStore, ModelFormStoreContext } from './ModelFormStoreContext';

export const useModelForm = (selector?: StoreSelector<ModelFormStore>) => {
  const modelFormStore = useContext(ModelFormStoreContext);
  if (!modelFormStore) {
    throw new Error(
      'useModelFormStore must be used within ModelFormStoreContext.Provider',
    );
  }
  const selected = selector ? useStore(modelFormStore, selector) : undefined;

  const setModelIndex = (
    setState: (state: ModelFormStore) => ModelFormStore,
  ) => {
    modelFormStore.setState(setState);
  };

  return { selected, setModelIndex };
};
