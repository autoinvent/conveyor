import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface NumberInputProps extends InputRenderFnProps {}

export const NumberInput = ({
  inputProps,
  inputState,
  formState,
  className,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: NumberInputProps) => {
  return (
    <input
      type="number"
      aria-invalid={ariaInvalid ?? inputState.invalid}
      className={twMerge(
        'h-full w-full bg-[--bg-accent] px-3 outline-1 outline-[--text-color] aria-[invalid=true]:border aria-[invalid=true]:border-[--danger] focus:outline aria-[invalid=true]:outline-[--danger]',
        className,
      )}
      {...htmlProps}
      {...inputProps}
    />
  );
};
