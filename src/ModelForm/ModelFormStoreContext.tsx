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

export interface ModelFormState<D extends DataType> {
  title?: ReactNode;
  fields: Field[];
  data?: D;
  showActions?: boolean;
  onCreate?: OnCreate<D>;
  onUpdate?: OnUpdate<D>;
  onDelete?: OnDelete<D>;
  onEdit?: (onEdit: () => void) => void;
  onCancelEdit?: (onCancelEdit: () => void) => void;
}

export const ModelFormStoreContext = createContext<
  StoreApi<ModelFormState<any>> | undefined
>(undefined);

export interface ModelFormStoreProviderProps<D extends DataType>
  extends ModelFormState<D> {
  children?: ReactNode;
}
export const ModelFormStoreProvider = <D extends DataType>({
  children,
  ...modelState
}: ModelFormStoreProviderProps<D>) => {
  const [store] = useState(() =>
    createStore(immer<ModelFormState<D>>(() => ({ ...modelState }))),
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
    <ModelFormStoreContext.Provider value={store}>
      {children}
    </ModelFormStoreContext.Provider>
  );
};
