import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export interface ModelIndexStore {
  data: DataType[];
}

export const ModelIndexStoreContext = createContext<Store<ModelIndexStore> | undefined>(
  undefined,
);
