import { useContext } from 'react';

import { AlertProps } from './Alert';
import { SetAlertsContext } from './AlertsContext';

export const useAddAlert = () => {
  const setAlerts = useContext(SetAlertsContext);
  return (alertProp: Omit<AlertProps, 'alertId'>) => {
    const alertId = Date.now().toString();
    setAlerts((alerts) => {
      return [{ ...alertProp, alertId }, ...alerts];
    });
    return alertId;
  };
};
