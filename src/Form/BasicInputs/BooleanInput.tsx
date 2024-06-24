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
    <div className="text-center">
      <Checkbox
        checked={value}
        value={value}
        onCheckedChange={onChange}
        aria-invalid={ariaInvalid ?? inputState.invalid}
        {...restInputProps}
        className={className}
        style={style}
      />
    </div>
    // <div
    //   className={twMerge(
    //     clsx(
    //       inputState.invalid && 'border border-danger',
    //       'flex h-full w-full items-center justify-center bg-input disabled:opacity-75',
    //     ),
    //   )}
    // >
    //   <input
    //     type="checkbox"
    //     aria-invalid={ariaInvalid ?? inputState.invalid}
    //     checked={value}
    //     className={className}
    //     {...htmlProps}
    //     {...restInputProps}
    //   />
    // </div>
  );
};
