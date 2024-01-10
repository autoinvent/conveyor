import { createContext, ReactNode } from 'react';

import { ModelData } from '../__types';

export const TableDataContext = createContext<ModelData[]>([]);

interface TableDataProviderProps {
  value: ModelData[];
  children: ReactNode;
}

export const TableDataProvider = ({
  value,
  children,
}: TableDataProviderProps) => {
  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
};
