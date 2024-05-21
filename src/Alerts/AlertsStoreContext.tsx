import { createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { AlertProps } from './Alert';

export interface AlertsStore {
  alerts: AlertProps[];
}

export const AlertsStoreContext = createContext<Store<AlertsStore> | undefined>(
  undefined,
);
