import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from './types';

export interface DataStore {
    original: DataType
    current: DataType
}

export const DataStoreContext = createContext<Store<DataStore> | undefined>(undefined);
