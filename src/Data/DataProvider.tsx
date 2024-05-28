import { type ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsMounted } from '@/hooks';

import { DataStoreContext } from './DataStoreContext';
import type { DataType } from './types';

export interface DataProviderProps {
  data: DataType;
  children: ReactNode;
}

export const DataProvider = ({ data, children }: DataProviderProps) => {
  const [dataStore] = useState(new Store<DataType>(data));

  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted.current) {
      dataStore.setState(() => ({ ...data }));
    }
  }, [data]);

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};
