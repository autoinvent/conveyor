import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';

import { useAlerts } from './useAlerts';

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  alertId: string;
  content: ReactNode;
  expires?: number;
}

export const Alert = ({ alertId, content, expires, ...props }: AlertProps) => {
  const { removeAlert } = useAlerts();
  const [show, setShow] = useState(true);

  const onClose = () => {
    setShow(false);
    removeAlert(alertId);
  };

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

  return show ? (
    <div className='rounded' {...props} role='alert'>
      {content}
      <span onClick={onClose}>&times;</span>
    </div>
  ) : null;
};
