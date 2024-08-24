import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';

import type { LensType } from '@/Lenses';
import type { DataType, FieldOptions, OnActionTrigger } from '@/types';

export interface ModelFormState<
  D extends DataType,
  F extends string,
  T extends F,
> {
  fields: readonly F[];
  data: D;
  fieldOptions?: Partial<Record<T, FieldOptions>>;
  readOnly?: boolean;
  initialLens?: LensType;
  onCreate?: OnActionTrigger<D>;
  onUpdate?: OnActionTrigger<D>;
  onDelete?: OnActionTrigger<D>;
}

export const ModelFormStoreContext = createContext<
  StoreApi<ModelFormState<any, any, any>> | undefined
>(undefined);

export interface ModelFormStoreProviderProps<
  D extends DataType,
  F extends string,
  T extends F,
> extends ModelFormState<D, F, T> {
  children?: ReactNode;
}
export const ModelFormStoreProvider = <
  D extends DataType,
  F extends string,
  T extends F,
>({
  children,
  ...modelFormState
}: ModelFormStoreProviderProps<D, F, T>) => {
  const isMounted = useRef(false);
  const [store] = useState(() => createStore(() => modelFormState));
  /* 
    biome-ignore lint/correctness/useExhaustiveDependencies:
      The reference to tableState does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(modelFormState);
    else isMounted.current = true;
  }, [...Object.values(modelFormState), store]);

  return (
    <ModelFormStoreContext.Provider value={store}>
      {children}
    </ModelFormStoreContext.Provider>
  );
};
