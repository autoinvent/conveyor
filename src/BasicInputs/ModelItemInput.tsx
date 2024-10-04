import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { SelectInput } from './SelectInput';

export const ModelItemInput = forwardRef<
  ElementRef<typeof SelectInput>,
  ComponentPropsWithoutRef<typeof SelectInput>
>(({ value, onChange, selectoptions, options, ...selectInputProps }, ref) => {
  return (
    <SelectInput
      ref={ref}
      value={{ label: value?.displayValue ?? 'None', value: value?.id ?? '' }}
      onChange={(newValue) =>
        onChange?.({ id: newValue.value, displayValue: newValue.label })
      }
      options={options ?? selectoptions}
      {...selectInputProps}
    />
  );
});
