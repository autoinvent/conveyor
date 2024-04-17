import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';

import { ActionsConfig } from './types';

export interface ModelIndexStore {
  model: string;
  fields: string[];
  data: DataType[];
  actionsConfig?: ActionsConfig;
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
