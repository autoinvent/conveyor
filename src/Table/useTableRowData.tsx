import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { DataType } from '@/types';

import { TableRowStoreContext } from './TableRowStoreContext';

export const useTableRowData = (selector: (state: DataType) => any) => {
  const tableRowStore = useContext(TableRowStoreContext);
  if (!tableRowStore)
    throw new Error(
      'useTableRowData must be used within TableRowStoreProvider',
    );
  return useStore(tableRowStore, selector);
};
