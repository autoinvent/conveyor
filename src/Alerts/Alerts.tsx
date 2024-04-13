import { ComponentType, Fragment, HTMLAttributes, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { Alert, AlertProps } from './Alert';
import { AlertsStore, AlertsStoreContext } from './AlertsStoreContext';

export interface AlertsProps extends HTMLAttributes<HTMLDivElement> {
  AlertComponent?: ComponentType<AlertProps>;
}

export const Alerts = ({
  AlertComponent = Alert,
  children,
  className = 'alerts',
  ...props
}: AlertsProps) => {
  const [alertsStore] = useState(
    new Store<AlertsStore>({
      alerts: [],
    }),
  );
  const alerts = useStore(alertsStore, (state) => state.alerts);

  return (
    <AlertsStoreContext.Provider value={alertsStore}>
      <div className={className} {...props}>
        {alerts.map((alert) => {
          return (
            <Fragment key={alert.alertId}>
              <AlertComponent {...alert} />
            </Fragment>
          );
        })}
      </div>
      {children}
    </AlertsStoreContext.Provider>
  );
};
