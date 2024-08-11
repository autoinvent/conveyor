import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { Checkbox } from '@/lib/components/ui/checkbox';
import type { FormControlChildProps } from '@/Form';

export const BooleanInput = forwardRef<
  ElementRef<typeof Checkbox>,
  PropsWithoutRef<FormControlChildProps> &
    ComponentPropsWithoutRef<typeof Checkbox>
>(({ value, onChange, ...checkboxProps }, ref) => {
  return (
    <div className="flex items-center">
      <Checkbox
        checked={!!value}
        onCheckedChange={onChange}
        ref={ref}
        {...checkboxProps}
      />
    </div>
  );
});
