import { createContext, ReactNode } from 'react';

import { ModelData } from '../__types';

export const TableDataContext = createContext<string>('');

interface TableDataProviderProps {
  value: ModelData[];
  children: ReactNode;
}

export const TableDataProvider = ({
  value,
  children,
}: TableDataProviderProps) => {
  return (
    <TableDataContext.Provider value={JSON.stringify(value)}>
      {children}
    </TableDataContext.Provider>
  );
};
