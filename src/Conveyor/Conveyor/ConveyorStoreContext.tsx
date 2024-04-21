import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { TableView } from '@/ModelIndex';

import { ModelType } from '../types';

import { MQLFetcher } from './Conveyor';

export interface ConveyorStore {
  fetcher: MQLFetcher;
  models: Record<string, ModelType>;
  persistence: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: string) => Promise<any>;
  };
  tableViews: Record<string, TableView>;
}

export const ConveyorStoreContext = createContext<
  Store<ConveyorStore> | undefined
>(undefined);
