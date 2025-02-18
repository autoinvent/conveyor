import { createStore } from 'zustand';

import type { TableState } from './types';

export type TableStore = ReturnType<typeof createTableStore>;

export const createTableStore = (initTableState: TableState) => {
  return createStore<TableState>()(() => ({
    ...initTableState,
  }));
};
