import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useRef,
} from 'react';

import type { TableState } from '../types';
import { type TableStore, createTableStore } from '../utils';

export const TableContext = createContext<TableStore | null>(null);

export interface TableProviderProps extends PropsWithChildren<TableState> {}

export const TableProvider = ({
  columnIds,
  data,
  children,
}: TableProviderProps) => {
  const storeRef = useRef<TableStore>(null);
  if (!storeRef.current) {
    storeRef.current = createTableStore({ columnIds, data });
  }

  useEffect(() => {
    storeRef.current?.setState({ columnIds, data });
  }, [columnIds, data]);

  return <TableContext value={storeRef.current}>{children}</TableContext>;
};
