import { useContext } from 'react';

import { TableContext } from './TableContext';

export const useTable = () => {
  const table = useContext(TableContext);
  if (!table) throw new Error('TableContext is undefined');
  return table;
};
