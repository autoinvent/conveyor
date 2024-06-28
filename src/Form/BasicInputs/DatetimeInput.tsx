import { Input } from '@/lib/components/ui/input';
import { cn } from '@/lib/utils';

import type { InputRenderFnProps } from '@/Form';

export interface DatetimeInputProps extends InputRenderFnProps {}

export const DatetimeInput = ({
  inputProps: { value, ...restInputProps },
  inputState,
  formState,
  className,
  ...htmlProps
}: DatetimeInputProps) => {
  return (
    <Input
      type="datetime-local"
      value={value?.substring(0, 19) ?? ''}
      className={cn('dark:[color-scheme:dark]', className)}
      {...restInputProps}
      {...htmlProps}
    />
  );
};
