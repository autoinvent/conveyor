import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAlerts } from './useAlerts';
import { X } from 'lucide-react';

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  alertId: string;
  content: ReactNode;
  expires?: number;
}

export const Alert = ({
  alertId,
  content,
  expires,
  className,
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
        'relative text-center ml-[12.5%] w-3/4 max-h-20 rounded border border-[--fg-accent] p-4 pr-10 transition-colors overflow-hidden',
        className || 'bg-slate-300 text-slate-700',
      )}
      {...props}
      role='alert'
    >
      {content}
      <span
        className='absolute top-1/2 transform -translate-y-1/2 right-3 opacity-50 cursor-pointer hover:opacity-100'
        onClick={onClose}
      >
        <X />
      </span>
    </div>
  ) : null;
};
