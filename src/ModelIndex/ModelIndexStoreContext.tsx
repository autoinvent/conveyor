import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';

import { TableView } from './types';

export interface ModelIndexStore {
  model: string;
  fields: string[];
  data: DataType[];
  onSave?: (rowData: DataType) => Promise<any>;
  onDelete?: (rowData: DataType) => Promise<any>;
  showActions?: boolean;
  tableView?: TableView
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
