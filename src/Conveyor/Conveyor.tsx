import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { WrapperProp } from '@/types';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';
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

export interface ConveyorProps extends WrapperProp {
  fetcher: MQLFetcher;
  models?: Record<string, ModelType>;
}

export const Conveyor = ({ fetcher, models = {}, children }: ConveyorProps) => {
  const isFirstRender = useIsFirstRender();
  const queryClient = new QueryClient();
  const [conveyorStore] = useState(
    new Store<ConveyorStore>({ fetcher, models }),
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      conveyorStore.setState((state) => {
        return {
          ...state,
          fetcher,
        };
      });
    }
  }, [fetcher]);

  useEffect(() => {
    if (!isFirstRender.current) {
      conveyorStore.setState((state) => {
        return {
          ...state,
          models,
        };
      });
    }
  }, [models]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorStoreContext.Provider value={conveyorStore}>
        {children}
      </ConveyorStoreContext.Provider>
    </QueryClientProvider>
  );
};
