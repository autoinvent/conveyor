import { ReactNode, useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Store } from '@tanstack/react-store';

import { Alerts } from '@/Alerts';
import { useIsFirstRender } from '@/hooks';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';

import { Admin } from '../Admin';
import { IntrospectionProvider } from '../IntrospectionProvider';

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

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      conveyorStore.setState(() => {
        return {
          fetcher,
          models,
          persistence,
          tableViews,
        };
      });
    }
  }, [fetcher, models, persistence, tableViews]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorStoreContext.Provider value={conveyorStore}>
        {children === undefined ? (
          <>
            <Alerts>
              <IntrospectionProvider>
                <Admin />
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
