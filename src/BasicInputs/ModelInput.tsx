import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { SelectInput } from './SelectInput';

export const ModelInput = forwardRef<
  ElementRef<typeof SelectInput>,
  ComponentPropsWithoutRef<typeof SelectInput>
>(({ ...selectInputProps }, ref) => {
  return (
    <SelectInput
      ref={ref}
      getOptionLabel={(option) => option.displayValue}
      getOptionValue={(option) => option.id}
      getNewOptionData={(inputValue, optionLabel) => ({
        displayValue: optionLabel,
        id: inputValue,
      })}
      {...selectInputProps}
    />
  );
});
