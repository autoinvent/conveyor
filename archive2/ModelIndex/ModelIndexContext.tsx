import { createContext, ReactNode, useMemo } from 'react';

import { Model } from '@/types';

export enum TableState {
  LOADING,
  EMPTY,
  DEFAULT,
  ERROR,
}

export interface ModelIndexContext {
  model: Model;
  tableState: TableState;
}
export const ModelIndexContext = createContext<ModelIndexContext>({
  model: '',
  tableState: TableState.DEFAULT,
});

export interface ModelIndexProviderProps extends ModelIndexContext {
  model: Model;
  tableState: TableState;
  children?: ReactNode;
}

export const ModelIndexProvider = ({
  model,
  tableState,
  children,
}: ModelIndexProviderProps) => {
  // prevents unecessary renders on data reference change
  const value = useMemo(
    () => ({ model, tableState }),
    [JSON.stringify({ model, tableState })],
  );
  return (
    <ModelIndexContext.Provider value={value}>
      {children}
    </ModelIndexContext.Provider>
  );
};
