import { twMerge } from 'tailwind-merge';

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
    <input
      type="datetime-local"
      value={value?.substring(0, 19) ?? ''}
      className={twMerge('h-full w-full bg-[--bg-accent] px-3', className)}
      {...htmlProps}
      {...restInputProps}
    />
  );
};
