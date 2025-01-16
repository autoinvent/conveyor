import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type StoreApi, createStore } from 'zustand';

import type { DataType } from '@/types';

export enum Action {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  CANCEL_EDIT = 'CANCEL_EDIT',
}

export type OnActionTrigger<TParams, TReturn> =
  | ((params: TParams) => Promise<TReturn>)
  | ((params: TParams) => void);

export interface ActionParams<D extends DataType> {
  data: D;
  changedData: D;
  onEdit: () => void;
  onCancelEdit: () => void;
}

export type ActionsType<D extends DataType> = Partial<
  Record<Action, OnActionTrigger<ActionParams<D>, void> | null>
>;

export interface ActionState<D extends DataType> {
  showActions?: boolean;
  actions?: ActionsType<D>;
}

export const ActionStoreContext = createContext<
  StoreApi<ActionState<any>> | undefined
>(undefined);

export type ActionStoreProviderProps<D extends DataType> = ActionState<D> & {
  children?: ReactNode;
};

export const ActionStoreProvider = <D extends DataType>({
  children,
  ...actionState
}: ActionStoreProviderProps<D>) => {
  const isMounted = useRef(false);
  const [store] = useState(() => createStore(() => actionState));
  /* 
    biome-ignore lint/correctness/useExhaustiveDependencies:
      The reference to tableState does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(actionState);
    else isMounted.current = true;
  }, [...Object.values(actionState), store]);

  return (
    <ActionStoreContext.Provider value={store}>
      {children}
    </ActionStoreContext.Provider>
  );
};
