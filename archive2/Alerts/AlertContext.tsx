import { createContext, ReactNode } from 'react';

import { AlertProps } from './Alert';

export const AlertContext = createContext<AlertProps>({
  alertId: '',
  content: '',
});

export interface AlertProviderProps {
  alert: AlertProps;
  children: ReactNode;
}

export const AlertProvider = ({ alert, children }: AlertProviderProps) => {
  return (
    <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>
  );
};
