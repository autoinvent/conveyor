import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { DataStore, DataStoreContext } from './DataStoreContext';

export const useData = (selector?: StoreSelector<DataStore>) => {
  const dataStore = useContext(DataStoreContext);
  if (!dataStore) {
    throw new Error('useData must be used within DataStoreContext.Provider');
  }

  const data = selector ? useStore(dataStore, selector) : undefined;

  const setCurrentData = (field: string, current: any) => {
    dataStore.setState((state) => ({
      ...state,
      current: {
        ...state.current,
        [field]: current,
      },
    }));
  };

  const reset = () => {
    dataStore.setState((state) => {
      return {
        ...state,
        current: { ...state.original },
      };
    });
  };

  return { data, setCurrentData, reset };
};
