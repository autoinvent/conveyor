import { type ReactNode, createContext, useMemo } from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DataType, Field, OnCreate, OnUpdate, OnDelete } from '@/types';

export interface ModelIndexState<D extends DataType> {
  model: string;
  fields: Field[];
  data?: D[];
  showActions?: boolean;
  onCreate?: OnCreate<D>;
  onUpdate?: OnUpdate<D>;
  onDelete?: OnDelete<D>;
  // TODO: Add tableView
}

export const ModelIndexStoreContext = createContext<
  StoreApi<ModelIndexState<any>> | undefined
>(undefined);

export interface ModelIndexStoreProviderProps<D extends DataType>
  extends ModelIndexState<D> {
  children?: ReactNode;
}
export const ModelIndexStoreProvider = <D extends DataType>({
  children,
  ...modelState
}: ModelIndexStoreProviderProps<D>) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: entire states are used
  const store = useMemo(
    () => createStore(immer<ModelIndexState<D>>(() => ({ ...modelState }))),
    Object.values(modelState),
  );
  return (
    <ModelIndexStoreContext.Provider value={store}>
      {children}
    </ModelIndexStoreContext.Provider>
  );
};
