import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type StoreApi, createStore } from 'zustand';

import type { LensType } from '@/Lenses';
import type {
  ActionParams,
  DataType,
  FieldOptions,
  OnActionTrigger,
} from '@/types';

export interface ModelFormState<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
> {
  model: string;
  fields: readonly F[];
  data: D;
  fieldOptions?: Partial<Record<FT, FieldOptions>>;
  readOnly?: boolean;
  initialLens?: LensType;
  onCreate?: OnActionTrigger<DT>;
  onUpdate?: OnActionTrigger<DT>;
  onDelete?: OnActionTrigger<DT>;
  onEdit?: (params: Pick<ActionParams<DT>, 'onEdit'>) => void;
  onCancelEdit?: (params: Pick<ActionParams<DT>, 'onCancelEdit'>) => void;
}

export const ModelFormStoreContext = createContext<
  StoreApi<ModelFormState<any, any, any, any>> | undefined
>(undefined);

export interface ModelFormStoreProviderProps<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
> extends ModelFormState<D, F, DT, FT> {
  children?: ReactNode;
}
export const ModelFormStoreProvider = <
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
>({
  children,
  ...modelFormState
}: ModelFormStoreProviderProps<D, F, DT, FT>) => {
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
