import { Input } from '@/lib/components/ui/input';

import type { InputRenderFnProps } from '@/Form';

export interface NumberInputProps extends InputRenderFnProps {}

export const NumberInput = ({
  inputProps,
  inputState,
  formState,
  'aria-invalid': ariaInvalid,
  ...htmlProps
}: NumberInputProps) => {
  return (
    <Input
      type="number"
      aria-invalid={ariaInvalid ?? inputState.invalid}
      {...htmlProps}
      {...inputProps}
    />
  );
};
