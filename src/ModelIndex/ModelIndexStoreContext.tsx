import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export interface ModelIndexStore {
  model: string;
  fields: string[];
  data: DataType[];
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
