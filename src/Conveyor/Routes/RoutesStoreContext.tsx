import { ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

export interface RouteType {
  node: ReactNode;
  /* 
      List of component reference ID's to cross reference
      which components have attempted to fill the specified slot';
      The front (index 0) of the list will contain the latest component used
      and older components as you go down the list. 
    */
  refIds: string[];
}

export interface RoutesStore {
  routes: Record<string, RouteType>;
}

export const RoutesStoreContext = createContext<Store<RoutesStore> | undefined>(
  undefined,
);
