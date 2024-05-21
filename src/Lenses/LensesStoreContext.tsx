import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

export type LensType = string | number | boolean;

export interface LensesStore {
  activeLens?: LensType;
  AvailableLenses: Record<string, LensType>;
}

export const LensesStoreContext = createContext<Store<LensesStore> | undefined>(
  undefined,
);
