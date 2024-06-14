import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface NumberInputProps extends InputRenderFnProps {}

export const NumberInput = ({
  inputProps,
  inputState,
  formState,
  className,
  ...htmlProps
}: NumberInputProps) => {
  return (
    <input
      type="number"
      className={twMerge('h-full w-full bg-[--bg-accent] px-3', className)}
      {...htmlProps}
      {...inputProps}
    />
  );
};
