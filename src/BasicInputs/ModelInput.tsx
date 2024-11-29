import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { SelectInput } from './SelectInput';

export const ModelInput = forwardRef<
  ElementRef<typeof SelectInput>,
  ComponentPropsWithoutRef<typeof SelectInput>
>(({ value,  ...selectInputProps }, ref) => {
  return (
    <SelectInput
      ref={ref}
      value={value}
      getOptionLabel={(option: typeof value) => option.displayValue}
      getOptionValue={(option: typeof value) => option.id}
      getNewOptionData={(inputValue, optionLabel) => ({
        displayValue: optionLabel,
        id: inputValue,
      })}
      {...selectInputProps}
    />
  );
});
