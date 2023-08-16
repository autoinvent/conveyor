import { memo, FC, useContext } from "react";
import { Toast } from "react-bootstrap";

import {
  AlertsContext,
  AlertsDispatchContext,
} from "../contexts/AlertsContext";
import { PACKAGE_ABBR } from "../package";
import { AlertsAction } from "../reducers/alertsReducer";
import { BaseProps } from "../types";

/**
 * Renders on changes made to the alerts context state.
 * This component should be placed on the outermost level such as
 * where the navbar is implemented, where alerts persists even
 * after navigational changes. No need to redundantly place this in
 * multiple components.
 * `alerts` is an array of objects that contains the following key-values:
 * - type: A string that specified the type of the classname that should
 *         be used for an alert.
 * - message: A message to be displayed in the alert; can be a
 *            string or JSX element
 * - expires: The time to autohide an alert. Do not set this field
 *            if an expiration is not desired. Must be the number of
 *            ms elapsed since the epoch so that each re-render doesn't
 *            reset the timer set on an alert. (Cannot be implemented
 *            within the state context as Date.now() since reducers
 *            are required to be `pure functions`.)
 *
 *  Example with string message:
 *  const {dispatch} = useContext(AlertsContext)
 *  dispatch({
 *       type: AlertsAction.ADD_ALERT,
 *       payload: {
 *         type: 'success'
 *         message: 'This is a success alert',
 *         expires: 5000 + Date.now(),
 *       }
 *     })
 *   )
 *
 * Example with jsx message:
 * dispatch({
 *     type: AlertsAction.ADD_ALERT,
 *     payload: {
 *       type: 'warning',
 *       message:(<>Alert with link to Items page:  <a href='/Items'>Items</a> </>),
 *     }
 *   })
 *
 */
const Alerts: FC<BaseProps> = ({ id, className = "" }) => {
  const alerts = useContext(AlertsContext);
  const dispatch = useContext(AlertsDispatchContext);
  const onClose = (index: number) => {
    dispatch({ type: AlertsAction.REMOVE_ALERT, payload: index });
  };
  return (
    <div id={id} className={`${"alerts"} ${className}`}>
      {alerts.map((alert, index) => {
        const { id, type, message, expires } = alert;
        const delay = expires && expires - Date.now();
        return (
          <Toast
            key={`${PACKAGE_ABBR}-alert-${id}`}
            show={true}
            onClose={() => onClose(index)}
            autohide={Boolean(expires)}
            delay={delay}
            bsPrefix="alert"
            className={`alert-${type}`}
          >
            {message}
            <button className="close" onClick={() => onClose(index)}>
              x
            </button>
          </Toast>
        );
      })}
    </div>
  );
};

export default memo(Alerts) as FC<BaseProps>;
