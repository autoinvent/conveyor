import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { humanizeText } from '@/utils';

import { SelectInput } from './SelectInput';

export const EnumInput = forwardRef<
  ElementRef<typeof SelectInput>,
  Omit<ComponentPropsWithoutRef<typeof SelectInput>, 'value' | 'options'> & {
    value: string;
    options: string[];
  }
>(({ value, onChange, options, isCreatable, ...selectInputProps }, ref) => {
  const isArray = Array.isArray(value);
  const stringToOption = (str: string) => ({
    label: humanizeText(str),
    value: str,
  });
  return (
    <SelectInput
      ref={ref}
      value={value && stringToOption(value)}
      onChange={(newVal, actionMeta) => onChange?.(newVal.value, actionMeta)}
      options={options?.map(stringToOption)}
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
