import { ComponentType, ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

export interface LoadingStore {
  isLoading: boolean;
  LoadingComponent: ComponentType;
}

export const LoadingStoreContext = createContext<
  Store<LoadingStore> | undefined
>(undefined);
