import { Input } from '@/lib/components/ui/input';

import type { InputRenderFnProps } from '@/Form';

export interface StringInputProps extends InputRenderFnProps {}

export const StringInput = ({
  inputProps: { value, ...restInputProps },
  inputState,
  formState,
  ...htmlProps
}: StringInputProps) => {
  return (
    <Input
      type="text"
      value={value ?? ''}
      {...restInputProps}
      {...htmlProps}
      autoComplete="off"
    />
  );
};
