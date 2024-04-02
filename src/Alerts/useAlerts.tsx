import { useContext } from 'react';

import { generateUID } from '@/utils';

import { AlertProps } from './Alert';
import { AlertsStoreContext } from './AlertsStoreContext';

export const useAlerts = () => {
  const alertsStore = useContext(AlertsStoreContext);

  const addAlert =
    alertsStore === undefined
      ? () => {}
      : (alertProp: Omit<AlertProps, 'alertId'>) => {
          const alertId = generateUID({ prefix: 'alertId' });
          alertsStore.setState((state) => {
            const newAlerts = [{ ...alertProp, alertId }, ...state.alerts];
            return {
              ...state,
              alerts: newAlerts,
            };
          });
        };

  const removeAlert =
    alertsStore === undefined
      ? () => {}
      : (alertId: string) => {
          alertsStore.setState((state) => {
            const newAlerts = state.alerts.filter(
              (alert) => alert.alertId !== alertId,
            );
            return {
              ...state,
              alerts: newAlerts,
            };
          });
        };

  return { addAlert, removeAlert };
};
