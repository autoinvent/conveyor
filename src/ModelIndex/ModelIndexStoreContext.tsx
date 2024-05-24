import { type Dispatch, type ReactNode, type SetStateAction, createContext } from 'react';
import type { Store } from '@tanstack/react-store';

import type { DataType } from '@/Data';
import type { SelectOption } from '@/ModelForm';
import type { Field, TableView, OnSaveProps, ID } from '@/types';

export interface ModelIndexStore {
  fields: Field[];
  data: DataType[];
  totalDataLength: number;
  tableView: TableView;
  setTableView: Dispatch<SetStateAction<TableView>>;
  title?: ReactNode;
  onSave?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onDelete?: (id: ID) => Promise<any>;
  onCreate?: () => void;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  showActions?: boolean;
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
