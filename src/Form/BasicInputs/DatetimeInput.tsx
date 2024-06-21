import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface DatetimeInputProps extends InputRenderFnProps {}

export const DatetimeInput = ({
  inputProps: { value, ...restInputProps },
  inputState,
  formState,
  className,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: DatetimeInputProps) => {
  return (
    <input
      type="datetime-local"
      value={value?.substring(0, 19) ?? ''}
      aria-invalid={ariaInvalid ?? inputState.invalid}
      className={twMerge(
        'h-full w-full bg-input px-3 outline-1 outline-outline ring-0 aria-[invalid=true]:border aria-[invalid=true]:border-danger focus:outline aria-[invalid=true]:outline-danger dark:[color-scheme:dark]',
        className,
      )}
      {...htmlProps}
      {...restInputProps}
    />
  );
};
