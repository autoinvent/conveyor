import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { UseTableViewReturnType } from '@/hooks';
import { TableView } from '@/types';

export interface ModelIndexStore
  extends Partial<Omit<UseTableViewReturnType, 'tableViewStore'>> {
  fields: string[];
  data: DataType[];
  title?: string;
  onSave?: (rowData: DataType) => Promise<any>;
  onDelete?: (rowData: DataType) => Promise<any>;
  onCreate?: () => void;
  showActions?: boolean;
  tableView?: TableView;
}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
