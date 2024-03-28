import { useContext } from 'react';

import { DataContext } from './DataContext';

export const useData = () => {
  const data = useContext(DataContext);
  return { current: data };
};
