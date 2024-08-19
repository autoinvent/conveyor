import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface DatetimeDisplayProps extends FormDisplayChildProps {
  className?: string;
}

export const DatetimeDisplay = ({ value, className }: DatetimeDisplayProps) => {
  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {value ? new Date(value).toLocaleString() : 'N/A'}
    </span>
  );
};
