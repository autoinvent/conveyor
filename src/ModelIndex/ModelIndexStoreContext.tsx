import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [store] = useState(() =>
    createStore(immer<ModelIndexState<D>>(() => ({ ...modelState }))),
  );

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) store.setState(() => modelState);
  }, [modelState, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <ModelIndexStoreContext.Provider value={store}>
      {children}
    </ModelIndexStoreContext.Provider>
  );
};
