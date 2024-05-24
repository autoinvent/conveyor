import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { useAlerts } from './useAlerts';

export interface AlertProps extends Omit<ComponentProps<'div'>, 'content'> {
  alertId: string;
  content: ReactNode;
  expires?: number;
}

export const Alert = ({
  alertId,
  content,
  expires,
  className = 'bg-slate-300 text-slate-700',
  ...props
}: AlertProps) => {
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
    <div
      className={twMerge(
        'relative text-center w-full max-h-20 rounded border-2 p-4 transition-colors overflow-hidden',
        className,
      )}
      {...props}
      role="alert"
    >
      {content}
      <span
        className="absolute top-1/2 transform -translate-y-1/2 right-2 opacity-50 cursor-pointer hover:opacity-100"
        onClick={onClose}
      >
        <LuX />
      </span>
    </div>
  ) : null;
};
