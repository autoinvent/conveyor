import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { SelectInput } from './SelectInput';

export const EnumInput = forwardRef<
  ElementRef<typeof SelectInput>,
  Omit<ComponentPropsWithoutRef<typeof SelectInput>, 'value' | 'options'> & {
    value?: ReactNode | ReactNode[];
    options: ReactNode[];
  }
>(({ value, onChange, options, ...selectInputProps }, ref) => {
  const nodeToOption = (node: ReactNode) => ({
    label: node,
    value: node,
  });
  return (
    <SelectInput
      ref={ref}
      value={
        value &&
        (Array.isArray(value) ? value.map(nodeToOption) : nodeToOption(value))
      }
      options={options?.map(nodeToOption)}
      onChange={(newValue, actionMeta) =>
        onChange?.(
          Array.isArray(newValue)
            ? newValue.map((val) => val.value)
            : newValue?.value ?? null,
          actionMeta,
        )
      }
      {...selectInputProps}
    />
  );
});
