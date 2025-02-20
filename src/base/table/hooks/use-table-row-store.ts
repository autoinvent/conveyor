import { use } from 'react';

import { useStore } from 'zustand';

import { TableRowContext } from '../contexts/table-row-context';
import type { TableRowState } from '../types';

export const useTableRowStore = <T>(
  selector: (state: TableRowState) => T,
): T => {
  const store = use(TableRowContext);
  if (!store) throw new Error('Missing TableRowContext in the tree.');
  return useStore(store, selector);
};
