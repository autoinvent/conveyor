import { createContext } from 'react';
import type { Store } from '@tanstack/react-store';

import type { DataType } from './types';

export const DataStoreContext = createContext<Store<DataType> | undefined>(
  undefined,
);
