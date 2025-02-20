import { use } from 'react';

import { useStore } from 'zustand';

import { DataContext } from '../contexts/data-context';
import type { DataState } from '../types';

export const useDataStore = <T>(selector: (state: DataState) => T): T => {
  const store = use(DataContext);
  if (!store) throw new Error('Missing DataContext in the tree.');
  return useStore(store, selector);
};
