import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';

import type { DataType } from '@/types';

export interface TableState<D extends DataType> {
  columnIds: string[];
  data: D[];
}

export const TableStoreContext = createContext<
  StoreApi<TableState<any>> | undefined
>(undefined);

export interface TableStoreProviderProps<D extends DataType>
  extends TableState<D> {
  children?: ReactNode;
}
export const TableStoreProvider = <D extends DataType>({
  children,
  ...tableState
}: TableStoreProviderProps<D>) => {
  const isMounted = useRef(false);
  const [store] = useState(() => createStore(() => tableState));
  /* 
    biome-ignore lint/correctness/useExhaustiveDependencies:
      The reference to tableState does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(tableState);
    else isMounted.current = true;
  }, [...Object.values(tableState), store]);

  return (
    <TableStoreContext.Provider value={store}>
      {children}
    </TableStoreContext.Provider>
  );
};
