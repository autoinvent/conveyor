import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface StringInputProps extends InputRenderFnProps {}

export const StringInput = ({
  inputProps,
  inputState,
  formState,
  className,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: StringInputProps) => {
  return (
    <input
      type="text"
      aria-invalid={ariaInvalid ?? inputState.invalid}
      className={twMerge(
        'h-full w-full bg-input px-3 outline-1 outline-outline ring-0 aria-[invalid=true]:border aria-[invalid=true]:border-danger disabled:opacity-75 focus:outline aria-[invalid=true]:outline-danger',
        className,
      )}
      {...htmlProps}
      {...inputProps}
      autoComplete="false"
    />
  );
};
