import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface SelectInputProps extends InputRenderFnProps {}

export const SelectInput = ({
  inputProps,
  inputState,
  formState,
  className,
  ...htmlProps
}: SelectInputProps) => {
  return (
    <input
      type="text"
      className={twMerge('h-full w-full bg-[--bg-accent] px-3', className)}
      {...htmlProps}
      {...inputProps}
      autoComplete="false"
    />
  );
};
