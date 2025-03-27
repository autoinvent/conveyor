import { use } from 'react';

import { useStore } from 'zustand';

import type { Data } from '@/base/types';

import { TableContext } from '../contexts/table-context';
import type { TableState } from '../types';

export const useTableStore = <
  TColumn extends string,
  TData extends Data,
  TSelected,
>(
  selector: (state: TableState<TColumn, TData>) => TSelected,
): TSelected => {
  const store = use(TableContext);
  if (!store) throw new Error('Missing TableContext in the tree.');
  return useStore(store, selector);
};
