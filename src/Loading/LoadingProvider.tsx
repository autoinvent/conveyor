import { ComponentType, useEffect, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
import { WrapperProp } from '@/types';

import { LoadingScreen } from './LoadingScreen';
import { LoadingStore, LoadingStoreContext } from './LoadingStoreContext';

export interface LoadingProviderProps extends WrapperProp {
  LoadingComponent?: ComponentType;
  isLoading?: boolean;
}

export const LoadingProvider = ({
  LoadingComponent = LoadingScreen,
  isLoading = false,
  children,
}: LoadingProviderProps) => {
  const isFirstRender = useIsFirstRender();
  const [loadingStore] = useState(
    new Store<LoadingStore>({ isLoading, LoadingComponent }),
  );
  const { isLoading: currIsLoading, LoadingComponent: LC } = useStore(
    loadingStore,
    (state) => state,
  );
  useEffect(() => {
    if (!isFirstRender.current) {
      loadingStore.setState((state) => {
        return {
          ...state,
          isLoading,
        };
      });
    }
  }, [isLoading]);
  return (
    <LoadingStoreContext.Provider value={loadingStore}>
      {currIsLoading ? <LC /> : children}
    </LoadingStoreContext.Provider>
  );
};
