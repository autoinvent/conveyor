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
      value={{ label: value?._display_value ?? 'None', value: value?.id ?? '' }}
      onChange={(newValue) =>
        onChange?.({ id: newValue.value, _display_value: newValue.label })
      }
      options={options ?? selectoptions}
      {...selectInputProps}
    />
  );
});
