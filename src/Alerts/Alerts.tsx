import { ComponentType, Fragment, useMemo } from 'react'
import { Store, useStore } from "@tanstack/react-store"

import { CommonProps, WrapperProp } from '@/types'

import { Alert, AlertProps } from './Alert'
import { AlertsStore, AlertsStoreContext } from './AlertsStoreContext'

export interface AlertsProps extends CommonProps, WrapperProp {
    AlertComponent?: ComponentType<AlertProps>
}

export const Alerts = ({ AlertComponent = Alert, children, id, className, style }: AlertsProps) => {
    const alertsStore = useMemo(() => new Store<AlertsStore, (cb: AlertsStore) => AlertsStore>({ alerts: [], AlertComponent }), [])
    const { alerts, AlertComponent: AC } = useStore(alertsStore, (state) => state)
    return (
        <AlertsStoreContext.Provider value={alertsStore}>
            <div id={id} className={className} style={style}>
                {alerts.map((alert) => {
                    return (
                        <Fragment key={alert.alertId}>
                            <AC {...alert} />
                        </Fragment>
                    )
                })}
            </div>
            {children}
        </AlertsStoreContext.Provider>


    )
}