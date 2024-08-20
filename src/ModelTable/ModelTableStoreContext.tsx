import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { UseFormProps } from 'react-hook-form';
import { createStore, type StoreApi } from 'zustand';

import type {
  DataType,
  FieldOptions,
  OnActionTrigger,
  TableView,
} from '@/types';

export interface ColumnOptions extends FieldOptions {
  sortable?: boolean;
  hidable?: boolean;
  resizable?: boolean;
  width?: number; // content width of the cell
}

export interface TableOptions<F extends string> {
  fieldOrder: F[]; // Order + value of the field visibility
  sortOrder?: TableView['sort']; // Order + value of the field sort
  readOnly?: boolean;
  scrollable?: boolean | { className: string }; // Wraps the table with ScrollArea
  draggable?: boolean; // Wraps the table with DnDContext
  bordered?: boolean | { className: string }; // Wraps the table with div to add bordered styles
  onFieldOrderChange: (newFieldOrder: F[]) => void;
  onSortOrderChange?: (newSortOrder: TableView['sort']) => void;
  onWidthChange?: ({ field, width }: { field: F; width: number }) => void;
  columnOptions?: Partial<Record<F, ColumnOptions>>;
}

export interface FormOptions {
  resolver: UseFormProps['resolver'];
}

export interface ModelTableState<
  D extends DataType,
  F extends string,
  T extends F,
> {
  fields: readonly F[];
  data: D[];
  tableOptions: TableOptions<T>;
  formOptions?: FormOptions;
  onUpdate?: OnActionTrigger<D>;
  onDelete?: OnActionTrigger<D>;
}

export const ModelTableStoreContext = createContext<
  StoreApi<ModelTableState<any, any, any>> | undefined
>(undefined);

export interface ModelTableStoreProviderProps<
  D extends DataType,
  F extends string,
  T extends F,
> extends ModelTableState<D, F, T> {
  children?: ReactNode;
}
export const ModelTableStoreProvider = <
  D extends DataType,
  F extends string,
  T extends F,
>({
  children,
  ...modelTableState
}: ModelTableStoreProviderProps<D, F, T>) => {
  const isMounted = useRef(false);
  const [store] = useState(() => createStore(() => modelTableState));
  /* 
    biome-ignore lint/correctness/useExhaustiveDependencies:
      The reference to tableState does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(modelTableState);
    else isMounted.current = true;
  }, [...Object.values(modelTableState), store]);

  return (
    <ModelTableStoreContext.Provider value={store}>
      {children}
    </ModelTableStoreContext.Provider>
  );
};
