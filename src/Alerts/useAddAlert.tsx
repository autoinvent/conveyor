import { useContext } from "react"

import { generateUID } from '@/utils'

import { AlertProps } from "./Alert"
import { AlertsStoreContext } from "./AlertsStoreContext"

export const useAddAlert = () => {
    const alertsStore = useContext(AlertsStoreContext)
    if (alertsStore === undefined) throw new Error('useAddAlert must be used within AlertStoreContext.Provider')

    return (alertProp: Omit<AlertProps, 'alertId'>) => {
        const alertId = generateUID(32, 'alertId')
        alertsStore.setState((state) => {
            const newAlerts = [{ ...alertProp, alertId }, ...state.alerts]
            return {
                ...state,
                alerts: newAlerts
            }
        })
    }
} 