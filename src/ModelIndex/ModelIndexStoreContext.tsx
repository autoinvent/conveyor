import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DataType, Field, OnCreate, OnDelete, OnUpdate } from '@/types';

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
  const [store] = useState(() =>
    createStore(immer<ModelIndexState<D>>(() => ({ ...modelState }))),
  );

  const isMounted = useRef(false);
  /*
    biome-ignore lint/correctness/useExhaustiveDependencies: 
      The reference to modelState does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(() => modelState);
  }, [...Object.values(modelState), store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <ModelIndexStoreContext.Provider value={store}>
      {children}
    </ModelIndexStoreContext.Provider>
  );
};
