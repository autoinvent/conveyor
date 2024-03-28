import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { MQLFetcher } from './Conveyor';

export interface ConveyorStore {
  fetcher: MQLFetcher;
}

export const ConveyorStoreContext = createContext<
  Store<ConveyorStore> | undefined
>(undefined);
