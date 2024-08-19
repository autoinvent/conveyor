import type { ReactNode } from 'react';

import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface ModelItemDisplayProps extends FormDisplayChildProps {
  className?: string;
  getDisplayValue?: (value: FormDisplayChildProps['value']) => ReactNode;
}

export const ModelItemDisplay = ({
  value,
  getDisplayValue = (val) => val?._display_value ?? 'None',
  className,
}: ModelItemDisplayProps) => {
  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {getDisplayValue(value)}
    </span>
  );
};
