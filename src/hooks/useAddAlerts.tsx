import { useContext } from 'react'

import { Alert, AlertProps } from '@/components/Alert'
import { SetAlertsContext } from '@/contexts/Alerts'

export const useAddAlert = (AlertComponent = Alert) => {
    const setAlerts = useContext(SetAlertsContext)
    return (props: AlertProps) => {
        const alert = (<AlertComponent  {...props} />)
        setAlerts((alerts) => {
            return [alert, ...alerts]
        })
    }
}