import { createContext } from 'react';
import type { Store } from '@tanstack/react-store';

import type { AlertProps } from './Alert';

export interface AlertsStore {
  alerts: AlertProps[];
}

export const AlertsStoreContext = createContext<Store<AlertsStore> | undefined>(
  undefined,
);
