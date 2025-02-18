import { use } from 'react';

import { useStore } from 'zustand';

import { TableContext } from '../contexts/table-context';
import type { TableState } from '../types';

export const useTableContext = <T>(selector: (state: TableState) => T): T => {
  const store = use(TableContext);
  if (!store) throw new Error('Missing TableContext in the tree.');
  return useStore(store, selector);
};
