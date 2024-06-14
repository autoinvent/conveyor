import { twMerge } from 'tailwind-merge';

import type { InputRenderFnProps } from '@/Form';

export interface StringInputProps extends InputRenderFnProps {}

export const StringInput = ({
  inputProps,
  inputState,
  formState,
  className,
  ...htmlProps
}: StringInputProps) => {
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
