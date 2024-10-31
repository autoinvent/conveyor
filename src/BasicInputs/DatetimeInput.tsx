import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import type { FormControlChildProps } from '@/Form';
import { Input } from '@/lib/components/ui/input';
import { cn } from '@/lib/utils';

export const DatetimeInput = forwardRef<
  ElementRef<typeof Input>,
  FormControlChildProps & ComponentPropsWithoutRef<typeof Input>
>(({ value = '', className, ...inputProps }, ref) => {
  if (typeof value !== 'string') {
    throw new Error('value must be of type string.');
  }
  return (
    <Input
      type="datetime-local"
      value={value?.substring(0, 19) ?? ''}
      className={cn('dark:[color-scheme:dark]', className)}
      ref={ref}
      {...inputProps}
    />
  );
});
