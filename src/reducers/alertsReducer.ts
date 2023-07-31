import { ErrorMessage } from '../enums'
import { ReducerAction } from '../types'

export interface Alert {
  id: string
  type: string
  message: string | JSX.Element
  expires?: number
}
export enum AlertsAction {
  ADD_ALERT = 'ADD_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

export const DEFAULT_SUCCESS_EXPIRE = 3000

const alertsReducer = (alerts: Alert[], action: ReducerAction) => {
  const { type, payload } = action
  switch (type) {
    case AlertsAction.ADD_ALERT: {
      let newAlerts = Array.isArray(payload) ? payload : [payload]
      newAlerts = alerts.concat(newAlerts)
      newAlerts = newAlerts.map((newAlert, index) => {
        // Alert.id is to be used as a key prop for components
        // since it does not change upon any other alert action
        newAlert.id = index.toString()
        return newAlert
      })
      return newAlerts
    }
    case AlertsAction.REMOVE_ALERT: {
      const newAlerts = [...alerts]
      if (payload < alerts.length && payload >= 0) {
        newAlerts.splice(payload, 1)
      }
      return newAlerts
    }
    default: {
      throw Error(`${ErrorMessage.REDUCER_ACTION_DNE} ${type}`)
    }
  }
}

export default alertsReducer
