import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';
import clsx from 'clsx';

export interface BooleanInputProps extends InputRenderFnProps {}

export const BooleanInput = ({
  inputProps,
  inputState,
  formState,
  className,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: BooleanInputProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          inputState.invalid && 'border border-[--danger]',
          'flex h-full w-full items-center justify-center bg-[--bg-accent]',
        ),
      )}
    >
      <input
        type="checkbox"
        aria-invalid={ariaInvalid ?? inputState.invalid}
        className={className}
        {...htmlProps}
        {...inputProps}
      />
    </div>
  );
};
