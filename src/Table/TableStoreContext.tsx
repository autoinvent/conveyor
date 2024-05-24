import { createContext } from 'react';
import type { Store } from '@tanstack/react-store';

import type { DataType } from '@/Data';

export interface TableStore {
  columnIds: string[];
  data?: DataType[];
}

export const TableStoreContext = createContext<Store<TableStore> | undefined>(
  undefined,
);
