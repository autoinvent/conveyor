import { ReactNode, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import { DataStoreContext, DataStore } from './DataStoreContext';
import { DataType } from './types';

export interface DataProviderProps extends Partial<DataStore> {
  original: DataType;
  children: ReactNode;
}

export const DataProvider = ({
  original,
  current = original,
  children,
}: DataProviderProps) => {
  const [dataStore] = useState(new Store<DataStore>({ original, current }));
  useStoreSetStateEffect({
    store: dataStore,
    setState: (state) => ({ ...state, original }),
    deps: [original],
  });
  useStoreSetStateEffect({
    store: dataStore,
    setState: (state) => ({ ...state, current }),
    deps: [current],
  });
  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};
