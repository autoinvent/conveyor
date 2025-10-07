import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface RawDisplayProps extends FormDisplayChildProps {
  className?: string;
}

export const RawDisplay = ({ value, className, ...props }: RawDisplayProps) => {
  return (
    <span className={cn('whitespace-pre-wrap', className)} {...props}>
      {value}
    </span>
  );
};
