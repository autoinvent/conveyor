import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { Slots } from '@/Slots';

import { Alerts, ALERTS_SLOT } from './Alerts';
import { AlertProps } from './Alert';

export const AlertsContext = createContext<AlertProps[]>([]);
export const SetAlertsContext = createContext<
  Dispatch<SetStateAction<AlertProps[]>>
>(() => {
  throw new Error('SetAlertsContext must be used within AlertsProvider');
});

export interface AlertsProviderProps {
  children: ReactNode;
}

export const AlertsProvider = ({ children }: AlertsProviderProps) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  return (
    <SetAlertsContext.Provider value={setAlerts}>
      <AlertsContext.Provider value={alerts}>
        <Slots slotKeys={[ALERTS_SLOT]}>{children}</Slots>
      </AlertsContext.Provider>
    </SetAlertsContext.Provider>
  );
};
