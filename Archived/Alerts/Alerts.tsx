import {
  type ComponentProps,
  type ComponentType,
  Fragment,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { Store, useStore } from '@tanstack/react-store';

import { Alert, type AlertProps } from './Alert';
import { type AlertsStore, AlertsStoreContext } from './AlertsStoreContext';

export interface AlertsProps extends ComponentProps<'div'> {
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
      <div
        className={twMerge(
          'absolute mt-2 ml-[12.5%] w-3/4 flex flex-wrap flex-col gap-y-1 content-center z-10',
          className,
        )}
        {...props}
      >
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
