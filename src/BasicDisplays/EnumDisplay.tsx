import { type ReactNode, forwardRef } from 'react';

import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';
import { humanizeText } from '@/utils';

export interface EnumDisplayProps extends FormDisplayChildProps {
  className?: string;
  getDisplayValue?: (value: FormDisplayChildProps['value']) => ReactNode;
}

export const EnumDisplay = forwardRef<HTMLSpanElement, EnumDisplayProps>(
  (
    {
      value,
      getDisplayValue = (val) => {
        return val ? humanizeText(val) : 'None';
      },
      className,
      ...props
    },
    ref,
  ) => {
    const parsedValue =
      Array.isArray(value) && value.length > 0 ? value : [value];
    const modelList = parsedValue
      .flatMap((val: ReactNode) => [getDisplayValue(val), ', '])
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
