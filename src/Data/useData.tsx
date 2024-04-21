import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { DataStore, DataStoreContext } from './DataStoreContext';
import { DataType } from './types';

export const useData = (selector?: StoreSelector<DataStore>) => {
  const dataStore = useContext(DataStoreContext);
  if (!dataStore) {
    throw new Error('useData must be used within DataStoreContext.Provider');
  }

  const data = selector ? useStore(dataStore, selector) : undefined;

  const setCurrentData = (current: DataType) => {
    dataStore.setState((state) => ({ ...state, current }));
  };

  return { data, setCurrentData };
};
