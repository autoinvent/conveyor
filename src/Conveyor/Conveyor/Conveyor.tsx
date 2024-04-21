import { ReactNode, useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Store, useStore } from '@tanstack/react-store';

import { Alerts } from '@/Alerts';
import { useStoreSetStateEffect } from '@/hooks';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';
import { IntrospectionProvider } from '../IntrospectionProvider';
import { Routes } from '../Routes';

export interface MQLResponse {
  [operationName: string]: Record<string, any>;
}

export interface MQLFetcherParams {
  document: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export type MQLFetcher = (params: MQLFetcherParams) => Promise<MQLResponse>;

export interface ConveyorProps extends Partial<ConveyorStore> {
  fetcher: MQLFetcher;
  children?: ReactNode;
}

export const Conveyor = ({
  fetcher,
  models = {},
  persistence = {
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(),
  },
  tableViews = {},
  children,
}: ConveyorProps) => {
  const queryClient = new QueryClient();
  const [conveyorStore] = useState(
    new Store<ConveyorStore>({ fetcher, models, persistence, tableViews }),
  );

  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, fetcher }),
    deps: [fetcher],
  });
  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, models }),
    deps: [models],
  });
  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, persistence }),
    deps: [persistence],
  });
  useStoreSetStateEffect({
    store: conveyorStore,
    setState: (state) => ({ ...state, tableViews }),
    deps: [tableViews],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorStoreContext.Provider value={conveyorStore}>
        {children === undefined ? (
          <>
            <Alerts>
              <IntrospectionProvider>
                <Routes />
              </IntrospectionProvider>
            </Alerts>
          </>
        ) : (
          children
        )}
      </ConveyorStoreContext.Provider>
    </QueryClientProvider>
  );
};
