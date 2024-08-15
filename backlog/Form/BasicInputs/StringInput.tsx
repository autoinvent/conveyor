import { Textarea } from '@/lib/components/ui/textarea';

import type { InputRenderFnProps } from '@/Form';

export interface StringInputProps extends InputRenderFnProps {}

export const StringInput = ({
  inputProps: { value, ...restInputProps },
}: StringInputProps) => {
  return (
    <Textarea
      value={value ?? ''}
      {...restInputProps}
      rows={1}
      autoComplete="off"
    />
  );
};
