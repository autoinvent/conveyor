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
>((props, ref) => {
  return <Textarea rows={1} autoComplete="off" ref={ref} {...props} />;
});
