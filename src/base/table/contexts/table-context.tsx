import { type ReactNode, createContext } from 'react';

import type { TableStore } from '../types';

export const TableContext = createContext<TableStore | null>(null);

export interface TableProviderProps {
  store: TableStore | null;
  children: ReactNode;
}

export const TableProvider = ({ store, children }: TableProviderProps) => {
  // useEffect(() => {
  //   storeRef.current?.setState({ columnIds, data, components });
  // }, [columnIds, data, components]);

  return <TableContext value={store}>{children}</TableContext>;
};
