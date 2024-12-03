import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import type { FormControlChildProps } from '@/Form';
import { Input } from '@/lib/components/ui/input';

export const NumberInput = forwardRef<
  ElementRef<typeof Input>,
  FormControlChildProps & ComponentPropsWithoutRef<typeof Input>
>(({ value, onChange, ...props }, ref) => {
  return (
    <Input
      value={value ?? ''}
      onChange={(e) =>
        onChange?.(e.target.value === '' ? null : e.target.value)
      }
      type="number"
      ref={ref}
      {...props}
    />
  );
});
