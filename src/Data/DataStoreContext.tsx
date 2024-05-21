import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from './types';

export const DataStoreContext = createContext<Store<DataType> | undefined>(
  undefined,
);
