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
>((props, ref) => {
  return <Input type="number" ref={ref} {...props} />;
});
