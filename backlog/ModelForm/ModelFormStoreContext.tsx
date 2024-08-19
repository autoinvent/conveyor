import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { LensType } from '@/Lenses';
import type {
  DataType,
  FieldOptions,
  OnCreate,
  OnDelete,
  OnUpdate,
} from '@/types';

export interface ModelFormState<D extends DataType, F extends string> {
  fields: F[];
  data: D;
  fieldOptions?: Partial<Record<F, FieldOptions>>;
  readOnly?: boolean;
  onCreate?: OnCreate<D>;
  onUpdate?: OnUpdate<D>;
  onDelete?: OnDelete<D>;
  onEdit?: (onEdit: () => void) => void;
  onCancelEdit?: (onCancelEdit: () => void) => void;
  initialLens?: LensType;
}

/**
 * https://github.com/pmndrs/zustand/discussions/1281#discussioncomment-10206641
 */
type ModelFormStore = ReturnType<
  typeof createStore<ModelFormState<any, any>, [['zustand/immer', never]]>
>;
export const ModelFormStoreContext = createContext<ModelFormStore | undefined>(
  undefined,
);

export interface ModelFormStoreProviderProps<
  D extends DataType,
  F extends string,
> extends ModelFormState<D, F> {
  children?: ReactNode;
}
export const ModelFormStoreProvider = <D extends DataType, F extends string>({
  children,
  ...modelState
}: ModelFormStoreProviderProps<D, F>) => {
  const [store] = useState(() =>
    createStore(immer<ModelFormState<D, F>>(() => ({ ...modelState }))),
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
