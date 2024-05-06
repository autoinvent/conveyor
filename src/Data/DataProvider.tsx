import { ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

import { DataStoreContext, DataStore } from './DataStoreContext';
import { DataType } from './types';

export interface DataProviderProps extends Partial<DataStore> {
  original: DataType;
  children: ReactNode;
}

export const DataProvider = ({
  original,
  current = { ...original },
  children,
}: DataProviderProps) => {
  const [dataStore] = useState(new Store<DataStore>({ original, current }));

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      dataStore.setState(() => ({ original, current }));
    }
  }, [original, current]);

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};
