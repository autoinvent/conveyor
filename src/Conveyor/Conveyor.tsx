import { ReactNode, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Store } from '@tanstack/react-store';

import { Alerts } from '@/Alerts'
import { useStoreSetStateEffect } from '@/hooks';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';
import { Home } from './Home';
import { IntrospectionProvider } from './IntrospectionProvider';
import { Routes, Route } from './Routes'
import { ModelType } from './types';

export interface MQLResponse {
  [operationName: string]: Record<string, any>;
}

export interface MQLFetcherParams {
  document: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export type MQLFetcher = (params: MQLFetcherParams) => Promise<MQLResponse>;

export interface ConveyorProps {
  fetcher: MQLFetcher;
  models?: Record<string, ModelType>;
  children?: ReactNode
}

export const Conveyor = ({ fetcher, models = {}, children }: ConveyorProps) => {
  const queryClient = new QueryClient();
  const [conveyorStore] = useState(
    new Store<ConveyorStore>({ fetcher, models }),
  );
  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, fetcher }),
    deps: [fetcher]
  });
  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, models }),
    deps: [models]
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorStoreContext.Provider value={conveyorStore}>
        {children === undefined ? (
          <>
            <Alerts>
              <IntrospectionProvider>
                <Routes>
                  <Route path="/">
                    <Home />
                  </Route>
                </Routes>

              </IntrospectionProvider>
            </Alerts>
          </>
        ) : children}
      </ConveyorStoreContext.Provider>
    </QueryClientProvider>
  );
};
