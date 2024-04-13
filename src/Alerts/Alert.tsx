import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { Alert as RBAlert } from 'react-bootstrap'; // TODO: Replace

import { useAlerts } from './useAlerts';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  alertId: string;
  content: ReactNode;
  expires?: number;
}

export const Alert = ({
  alertId,
  content,
  expires,
  className = 'alert',
  ...props
}: AlertProps) => {
  const { removeAlert } = useAlerts();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    if (expires) {
      timer = setTimeout(() => {
        removeAlert(alertId);
      }, expires);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [expires]);

  return (
    <RBAlert
      show={true}
      className={className}
      {...props}
      dismissible
      onClose={() => removeAlert(alertId)}
    >
      {content}
    </RBAlert>
  );
};
