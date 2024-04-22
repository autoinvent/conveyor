import { ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

export interface SlotType {
  node: ReactNode;
  /* 
      List of component reference ID's to cross reference
      which components have attempted to fill the specified slot';
      The front (index 0) of the list will contain the latest component used
      and older components as you go down the list. 
    */
  refIds: string[];
}

export interface SlotsStore {
  slotOrder: string[];
  slots: Record<string, SlotType>;
}

export const SlotsStoreContext = createContext<Store<SlotsStore> | undefined>(
  undefined,
);
