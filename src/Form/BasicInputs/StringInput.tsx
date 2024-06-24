import { Input } from '@/lib/components/ui/input';

import type { InputRenderFnProps } from '@/Form';

export interface StringInputProps extends InputRenderFnProps {}

export const StringInput = ({
  inputProps,
  inputState,
  formState,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: StringInputProps) => {
  return (
    <Input
      type="text"
      aria-invalid={ariaInvalid ?? inputState.invalid}
      {...htmlProps}
      {...inputProps}
      autoComplete="false"
    />
  );
};
