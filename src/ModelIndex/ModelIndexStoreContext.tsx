import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { UseTableViewReturnType } from '@/hooks';
import { Field, TableView } from '@/types';

export interface ModelIndexStore
  extends Partial<Omit<UseTableViewReturnType, 'tableViewStore'>> {
  fields: Field[];
  data: DataType[];
  tableView: TableView;
  setTableView: Dispatch<SetStateAction<TableView>>;
  title?: ReactNode;
  onSave?: (rowData: DataType) => Promise<any>;
  onDelete?: (rowData: DataType) => Promise<any>;
  onCreate?: () => void;
  showActions?: boolean;

}

export const ModelIndexStoreContext = createContext<
  Store<ModelIndexStore> | undefined
>(undefined);
