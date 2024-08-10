import { Textarea } from '@/lib/components/ui/textarea';

import { FormControlSlotProps } from '../FormControl';
import { forwardRef } from 'react';

export const StringInput = forwardRef((props: FormControlSlotProps, ref) => {
  return <Textarea ref={ref} rows={1} autoComplete="off" {...props} />;
});
