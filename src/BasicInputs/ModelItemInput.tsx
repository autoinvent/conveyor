import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { SelectInput } from './SelectInput';

export const ModelItemInput = forwardRef<
  ElementRef<typeof SelectInput>,
  ComponentPropsWithoutRef<typeof SelectInput>
>(({ value, onChange, ...selectInputProps }, ref) => {
  console.log(value, selectInputProps.options);
  return (
    <SelectInput
      ref={ref}
      value={{ label: value._display_value, value: value?.id ?? '' }}
      onChange={(newValue) =>
        onChange?.({ id: newValue.value, _display_value: newValue.label })
      }
      {...selectInputProps}
    />
  );
});
