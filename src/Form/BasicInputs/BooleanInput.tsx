import { Checkbox } from '@/lib/components/ui/checkbox';

import type { InputRenderFnProps } from '@/Form';

export interface BooleanInputProps extends InputRenderFnProps {}

export const BooleanInput = ({
  inputProps: { value, onChange, ...restInputProps },
  inputState,
  'aria-invalid': ariaInvalid,
  className,
  style,
}: BooleanInputProps) => {
  return (
    <Checkbox
      checked={value}
      value={value}
      onCheckedChange={onChange}
      aria-invalid={ariaInvalid ?? inputState.invalid}
      {...restInputProps}
      className={className}
      style={style}
    />
  );
};
