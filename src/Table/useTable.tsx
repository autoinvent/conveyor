import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types';

import { TableStore, TableStoreContext } from './TableStoreContext';

export const useTable = (selector?: StoreSelector<TableStore>) => {
  const tableStore = useContext(TableStoreContext);
  if (!tableStore) {
    throw new Error('useTable must be used within TableStoreContext.Provider');
  }

  const selected = selector ? useStore(tableStore, selector) : undefined;

  const setTable = (setState: (state: TableStore) => TableStore) => {
    tableStore.setState(setState);
  };

  return { selected, setTable };
};
