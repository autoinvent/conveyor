import { ComponentType, Fragment, useEffect, useState } from 'react';
import { Store, useStore } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';
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
  const isFirstRender = useIsFirstRender();
  const [alertsStore] = useState(
    new Store<AlertsStore>({
      alerts: [],
      AlertComponent,
    }),
  );
  const { alerts, AlertComponent: AC } = useStore(
    alertsStore,
    (state) => state,
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      alertsStore.setState((state) => {
        return {
          ...state,
          AlertComponent,
        };
      });
    }
  }, [AlertComponent]);
  return (
    <AlertsStoreContext.Provider value={alertsStore}>
      <div id={id} className={className} style={style}>
        {alerts.map((alert) => {
          return (
            <Fragment key={alert.alertId}>
              <AC {...alert} />
            </Fragment>
          );
        })}
      </div>
      {children}
    </AlertsStoreContext.Provider>
  );
};
