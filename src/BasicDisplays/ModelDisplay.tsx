import { type ReactNode, forwardRef } from 'react';

import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface ModelDisplayProps extends FormDisplayChildProps {
  className?: string;
  getDisplayValue?: (value: FormDisplayChildProps['value']) => ReactNode;
  noneValue?: ReactNode;
}

export const ModelDisplay = forwardRef<HTMLSpanElement, ModelDisplayProps>(
  (
    {
      value,
      getDisplayValue = (val) => {
        return val?.displayValue;
      },
      noneValue = 'None',
      className,
      ...props
    },
    ref,
  ) => {
    const parsedValue = Array.isArray(value) || !value ? value : [value];
    const modelList =
      !parsedValue || parsedValue.length === 0
        ? noneValue
        : parsedValue
            .flatMap((val: any) => [getDisplayValue(val), ', '])
            .slice(0, -1);
    return (
      <span
        ref={ref}
        className={cn('whitespace-pre-wrap', className)}
        {...props}
      >
        {modelList}
      </span>
    );
  },
);
