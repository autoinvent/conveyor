import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface DatetimeDisplayProps extends FormDisplayChildProps {
  className?: string;
}

export const DatetimeDisplay = ({
  value,
  className,
  ...props
}: DatetimeDisplayProps) => {
  return (
    <span className={cn('whitespace-pre-wrap', className)} {...props}>
      {value ? new Date(value).toLocaleString() : 'N/A'}
    </span>
  );
};
