import { ComponentType, Fragment, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { Alert, AlertProps } from './Alert';
import { AlertsStore, AlertsStoreContext } from './AlertsStoreContext';

export interface AlertsProps extends CommonProps, WrapperProp {
  AlertComponent?: ComponentType<AlertProps>;
}

export const Alerts = ({
  AlertComponent = Alert,
  children,
  id,
  className,
  style,
}: AlertsProps) => {
  const [alertsStore] = useState(
    new Store<AlertsStore>({
      alerts: [],
    }),
  );
  const alerts = useStore(alertsStore, (state) => state.alerts);

  return (
    <AlertsStoreContext.Provider value={alertsStore}>
      <div id={id} className={className} style={style}>
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
