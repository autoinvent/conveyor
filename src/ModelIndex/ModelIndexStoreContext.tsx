import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { SelectOption } from '@/Form';
import { Field, TableView, OnSaveProps } from '@/types';

export interface ModelIndexStore {
  fields: Field[];
  data: DataType[];
  tableView: TableView;
  setTableView: Dispatch<SetStateAction<TableView>>;
  title?: ReactNode;
  onSave?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onDelete?: (rowData: DataType) => Promise<any>;
  onCreate?: () => void;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  showActions?: boolean;
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
