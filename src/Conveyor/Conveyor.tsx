import { useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { WrapperProp } from '@/types';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';

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
}

export const Conveyor = ({ fetcher, children }: ConveyorProps) => {
  const isFirstRender = useIsFirstRender();
  const [conveyorStore] = useState(new Store<ConveyorStore>({ fetcher }));

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

  return (
    <ConveyorStoreContext.Provider value={conveyorStore}>
      {children}
    </ConveyorStoreContext.Provider>
  );
};
