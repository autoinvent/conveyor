import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export interface TableStore {
  data: DataType[];
  columnIds: string[];
}

export const TableStoreContext = createContext<Store<TableStore> | undefined>(
  undefined,
);
