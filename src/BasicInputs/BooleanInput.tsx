import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type PropsWithoutRef,
  forwardRef,
} from 'react';

import type { FormControlChildProps } from '@/Form';
import { Checkbox } from '@/lib/components/ui/checkbox';

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
