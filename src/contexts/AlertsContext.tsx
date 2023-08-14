import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from "react";

import { alertsReducer, Alert, AlertsAction } from "../reducers/alertsReducer";
import { ReducerAction } from "../types";

export const AlertsContext = createContext([] as Alert[]);

export const AlertsDispatchContext = createContext(
  (() => null) as Dispatch<ReducerAction>
);

interface AlertsProviderProps {
  children?: ReactNode;
  alerts?: Alert[];
}

const AlertsProvider = ({ children, alerts = [] }: AlertsProviderProps) => {
  const [alertsProvider, dispatch] = useReducer(alertsReducer, alerts);

  useEffect(() => {
    if (alerts !== alertsProvider) {
      alerts.forEach((alert) =>
        dispatch({ type: AlertsAction.ADD_ALERT, payload: alert })
      );
    }
  }, [alerts]);

  return (
    <AlertsContext.Provider value={alertsProvider}>
      <AlertsDispatchContext.Provider value={dispatch}>
        {children}
      </AlertsDispatchContext.Provider>
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
