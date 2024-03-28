import { useContext } from 'react';

import { AlertsStoreContext } from './AlertsStoreContext';

export const useRemoveAlert = () => {
  const alertsStore = useContext(AlertsStoreContext);
  if (alertsStore === undefined)
    throw new Error('useRemoveAlert must be used within Alerts');

  return (alertId: string) => {
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
};
