import { useContext } from 'react'

import { SetAlertsContext } from './AlertsContext'

export const useRemoveAlert = () => {
    const setAlerts = useContext(SetAlertsContext)
    return (alertId: string) => {
        setAlerts((alerts) => {
            return alerts.filter((alert) => alert.alertId !== alertId)
        })
    }
}