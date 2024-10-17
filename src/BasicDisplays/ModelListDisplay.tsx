import type { ReactNode } from 'react';

import type { FormDisplayChildProps } from '@/Form';
import { cn } from '@/lib/utils';

export interface ModelListDisplayProps extends FormDisplayChildProps {
  className?: string;
  getDisplayValue?: (value: FormDisplayChildProps['value']) => ReactNode;
}

export const ModelListDisplay = ({
  value,
  getDisplayValue = (val) => {
    return val?._display_value ?? 'None';
  },
  className,
  ...props
}: ModelListDisplayProps) => {
  const modelList = value.flatMap((val: ReactNode) => [
    getDisplayValue(val),
    ', ',
  ]).slice(0,-1);

  return (
    <span className={cn('whitespace-pre-wrap', className)} {...props}>
      {modelList}
    </span>
  );
};
