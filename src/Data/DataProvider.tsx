import { ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

import { DataStoreContext } from './DataStoreContext';
import { DataType } from './types';

export interface DataProviderProps {
  data: DataType;
  children: ReactNode;
}

export const DataProvider = ({ data, children }: DataProviderProps) => {
  const [dataStore] = useState(new Store<DataType>(data));

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      dataStore.setState(() => ({ ...data }));
    }
  }, [data]);

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};
