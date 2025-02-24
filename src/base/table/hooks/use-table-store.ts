import { use } from 'react';

import { useStore } from 'zustand';

import { TableContext } from '../contexts/table-context';
import type { TableInternals, TableState } from '../types';

export const useTableStore = <T>(
  selector: (state: TableState<TableInternals>) => T,
): T => {
  const store = use(TableContext);
  if (!store) throw new Error('Missing TableContext in the tree.');
  return useStore(store, selector);
};
