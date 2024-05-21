import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { DataStoreContext } from './DataStoreContext';
import { DataType } from './types';

export const useData = (
  selector: StoreSelector<DataType> = (state) => state,
) => {
  const dataStore = useContext(DataStoreContext);
  if (!dataStore) {
    throw new Error('useData must be used within DataStoreContext.Provider');
  }

  const data = useStore(dataStore, selector);

  return data;
};
