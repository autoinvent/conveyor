import { useContext } from 'react'

import { AlertProps } from '@/components/Alert'
import { SetAlertPropsContext } from '@/contexts/Alerts'

export const useAddAlert = () => {
    const setAlertProps = useContext(SetAlertPropsContext)
    return (alertProp: Omit<AlertProps, 'alertId'>) => {
        const alertId = Date.now().toString()
        setAlertProps((alertProps) => {
            return [{ ...alertProp, alertId }, ...alertProps]
        })
        return alertId
    }
}

export const useRemoveAlert = () => {
    const setAlertProps = useContext(SetAlertPropsContext)
    return (alertId: string) => {
        setAlertProps((alertProps) => {
            return alertProps.filter((alertProp) => alertProp.alertId !== alertId)
        })
    }
}