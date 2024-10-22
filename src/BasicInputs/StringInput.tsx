import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import type { FormControlChildProps } from '@/Form';
import { Textarea } from '@/lib/components/ui/textarea';

export const StringInput = forwardRef<
  ElementRef<typeof Textarea>,
  FormControlChildProps & ComponentPropsWithoutRef<typeof Textarea>
>(({ value, ...props }, ref) => {
  return (
    <Textarea
      value={value ?? ''}
      rows={1}
      autoComplete="off"
      ref={ref}
      {...props}
    />
  );
});
