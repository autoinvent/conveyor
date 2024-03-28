import { useContext } from 'react';

import { TableStoreContext } from './TableStoreContext';

export const useTableStore = () => {
  const tableStore = useContext(TableStoreContext);
  if (!tableStore)
    throw new Error('useTableStore must be used within TableStoreContext');
  return tableStore;
};
