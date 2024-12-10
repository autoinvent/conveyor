import { type ElementRef, forwardRef } from 'react';

import { SelectInput, type SelectInputProps } from './SelectInput';

export const ModelInput = forwardRef<
  ElementRef<typeof SelectInput>,
  SelectInputProps<boolean>
>(({ value, onChange, options, isCreatable, ...selectInputProps }, ref) => {
  const isArray = Array.isArray(value);
  return (
    <SelectInput
      ref={ref}
      value={value}
      onChange={onChange}
      getOptionLabel={(option: typeof value) => option.displayValue}
      getOptionValue={(option: typeof value) => option.id}
      options={options}
      isMulti={isArray}
      clearValue={isArray ? () => [] : undefined}
      isClearable={!isArray}
      closeMenuOnSelect={!isArray}
      isCreatable={isCreatable}
      getNewOptionData={
        isCreatable
          ? (inputValue, optionLabel) => ({
              displayValue: optionLabel,
              id: inputValue,
            })
          : undefined
      }
      {...selectInputProps}
    />
  );
});
