import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { humanizeText } from '@/utils';

import { SelectInput } from './SelectInput';
import type { SelectOption } from '@/types';

export const EnumInput = forwardRef<
  ElementRef<typeof SelectInput>,
  Omit<ComponentPropsWithoutRef<typeof SelectInput>, 'value' | 'options'> & {
    value?: string | string[];
    options: string[];
    onChange: (newVals : string | string[]) => void
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
      value={
        value && (isArray ? value.map(stringToOption) : stringToOption(value))
      }
      onChange={(newValue : SelectOption | SelectOption[]) => 
        newValue && (
          Array.isArray(newValue) ?
          onChange?.(newValue.map( val => val.value)) :
          onChange?.(newValue.value)
        )
      }
      options={options?.map(stringToOption)}
      isMulti={isArray}
      clearValue={isArray ? () => [] : undefined}
      isClearable={isArray}
      isCreatable={isCreatable}
      {...selectInputProps}
    />
  );
});
