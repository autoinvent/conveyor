import { ComponentType, Fragment, HTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Store, useStore } from '@tanstack/react-store';

import { Alert, AlertProps } from './Alert';
import { AlertsStore, AlertsStoreContext } from './AlertsStoreContext';

export interface AlertsProps extends HTMLAttributes<HTMLDivElement> {
  AlertComponent?: ComponentType<AlertProps>;
}

export const Alerts = ({
  AlertComponent = Alert,
  children,
  className,
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
      <div className={twMerge('text-center absolute top-0 inset-x-0 w-full flex flex-col gap-y-1 z-50', className)} {...props}>
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
