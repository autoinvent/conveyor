import { Checkbox } from '@/lib/components/ui/checkbox';

import type { InputRenderFnProps } from '@/Form';

export interface BooleanInputProps extends InputRenderFnProps {}

export const BooleanInput = ({
  inputProps: { value, onChange, ...restInputProps },
  inputState,
  'aria-invalid': ariaInvalid,
  id,
  disabled,
  className,
  style,
}: BooleanInputProps) => {
  return (
    <div className="flex items-center">
      <Checkbox
        id={id}
        disabled={disabled}
        checked={value}
        value={value}
        onCheckedChange={onChange}
        aria-invalid={ariaInvalid ?? inputState.invalid}
        {...restInputProps}
        className={className}
        style={style}
      />
    </div>
  );
};
