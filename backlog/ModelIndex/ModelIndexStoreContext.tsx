import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type {
  DataType,
  FieldOptions,
  OnDelete,
  OnUpdate,
  TableView,
} from '@/types';

export interface ColumnOptions extends FieldOptions {
  editable?: boolean;
  sortable?: boolean;
  hidable?: boolean;
  draggable?: boolean;
}

export interface TableViewOptions {
  tableView: TableView;
  onTableViewChange: (newTableView: TableView) => void;
}

export interface PaginationOptions {
  totalDataLength: number;
}

export interface ModelIndexState<D extends DataType> {
  data?: D[];
  fields: string[];
  onFieldsChange: (newFields: string[]) => void;
  columnOptions?: Record<string, ColumnOptions>;
  tableViewOptions: TableViewOptions;
  paginationOptions: PaginationOptions;
  title?: ReactNode;
  readOnly?: boolean;
  onUpdate?: OnUpdate<D>;
  onDelete?: OnDelete<D>;
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
