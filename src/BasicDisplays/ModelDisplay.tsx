import type { ReactNode } from 'react';

import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface ModelDisplayProps extends FormDisplayChildProps {
  className?: string;
  getDisplayValue?: (value: FormDisplayChildProps['value']) => ReactNode;
}

export const ModelDisplay = ({
  value,
  getDisplayValue = (val) => {
    return val?.displayValue ?? 'None';
  },
  className,
  ...props
}: ModelDisplayProps) => {
  const parsedValue = Array.isArray(value) ? value : [value];
  const modelList = parsedValue
    .flatMap((val: ReactNode) => [getDisplayValue(val), ', '])
    .slice(0, -1);

  return (
    <span className={cn('whitespace-pre-wrap', className)} {...props}>
      {modelList}
    </span>
  );
};
