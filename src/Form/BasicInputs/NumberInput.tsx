import { Input } from '@/lib/components/ui/input';

import type { InputRenderFnProps } from '@/Form';

export interface NumberInputProps extends InputRenderFnProps {}

export const NumberInput = ({
  inputProps: { value, ...restInputProps },
}: NumberInputProps) => {
  return <Input type="number" value={value ?? 0} {...restInputProps} />;
};
