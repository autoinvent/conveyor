import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { DataType, Field, OnDelete, OnUpdate, TableView } from '@/types';

export interface TableViewOptions {
  tableView: TableView;
  onTableViewChange: Dispatch<SetStateAction<TableView>>;
}

export interface PaginationOptions {
  totalDataLength?: number;
  pageButtonLimit?: number; // The max number of page btns to show at a time
}

export interface ModelIndexState<D extends DataType> {
  fields: Field[];
  data?: D[];
  tableViewOptions: TableViewOptions;
  title?: ReactNode;
  readOnly?: boolean;
  onUpdate?: OnUpdate<D>;
  onDelete?: OnDelete<D>;
  paginationOptions?: PaginationOptions;
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
