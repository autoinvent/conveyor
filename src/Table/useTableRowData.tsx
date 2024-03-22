import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { DataType } from '@/types';

import { TableRowStoreContext } from './TableRowStoreContext';

export const useTableRowData = (getter: (cb: DataType) => DataType) => {
  const tableRowStore = useContext(TableRowStoreContext);
  if (!tableRowStore)
    throw new Error(
      'useTableRowData must be used within TableRowStoreProvider',
    );
  return useStore(tableRowStore, getter);
};
