import type { ValueRenderFnProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface RawValueProps extends ValueRenderFnProps {
  className?: string;
}

export const RawValue = ({ value, className }: RawValueProps) => {
  return (
    <div className={cn('min-w-64 whitespace-pre-wrap py-2', className)}>
      {value}
    </div>
  );
};
