import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { UseFormProps } from 'react-hook-form';
import { type StoreApi, createStore } from 'zustand';

import type { DataType, FieldOptions, ID, TableView } from '@/types';

export interface ColumnOptions extends FieldOptions {
  sortable?: boolean;
  hidable?: boolean;
  resizable?: boolean;
  width?: number; // content width of the cell
}

export interface TableOptions<F extends string> {
  sortOrder?: TableView['sort']; // Order + value of the field sort
  scrollable?: boolean | { className: string }; // Wraps the table with ScrollArea
  draggable?: boolean; // Wraps the table with DnDContext
  bordered?: boolean | { className: string }; // Wraps the table with div to add bordered styles
  onSortOrderChange?: (newSortOrder: TableView['sort']) => void;
  onWidthChange?: ({ field, width }: { field: F; width: number }) => void;
  selectedRows?: ID[];
}

export interface FormOptions
  extends Omit<UseFormProps, 'defaultValues' | 'values' | 'errors'> {
  errors?: Record<string | number, UseFormProps['errors']>;
}

export interface ModelTableState<
  D extends DataType,
  F extends string,
  FT extends F,
> {
  model: string;
  fields: readonly F[];
  fieldOrder: FT[]; // Order + value of the field visibility
  onFieldOrderChange: (newFieldOrder: F[]) => void;
  data: D[];
  tableOptions?: TableOptions<FT>;
  columnOptions?: Partial<Record<FT, ColumnOptions>>;
  formOptions?: FormOptions;
}

export const ModelTableStoreContext = createContext<
  StoreApi<ModelTableState<any, any, any>> | undefined
>(undefined);

export interface ModelTableStoreProviderProps<
  D extends DataType,
  F extends string,
  FT extends F,
> extends ModelTableState<D, F, FT> {
  children?: ReactNode;
}
export const ModelTableStoreProvider = <
  D extends DataType,
  F extends string,
  FT extends F,
>({
  children,
  ...modelTableState
}: ModelTableStoreProviderProps<D, F, FT>) => {
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
