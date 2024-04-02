import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { MQLFetcher } from './Conveyor';
import { ModelType } from './types';

export interface ConveyorStore {
  fetcher: MQLFetcher;
  models: Record<string, ModelType>;
}

export const ConveyorStoreContext = createContext<
  Store<ConveyorStore> | undefined
>(undefined);
