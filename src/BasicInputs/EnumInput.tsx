import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import type { SelectOption } from '@/types';
import { humanizeText } from '@/utils';

import { SelectInput } from './SelectInput';

export const EnumInput = forwardRef<
  ElementRef<typeof SelectInput>,
  Omit<ComponentPropsWithoutRef<typeof SelectInput>, 'value' | 'options'> & {
    value?: string | string[];
    options: string[];
    onChange: (newVals: string | string[]) => void;
  }
>(({ value, onChange, options, ...selectInputProps }, ref) => {
  const stringToOption = (str: string) => ({
    label: humanizeText(str),
    value: str,
  });
  return (
    <SelectInput
      ref={ref}
      value={
        value &&
        (Array.isArray(value)
          ? value.map(stringToOption)
          : stringToOption(value))
      }
      onChange={(newValue: SelectOption | SelectOption[] | null) =>
        Array.isArray(newValue)
          ? onChange?.(newValue.map((val) => val.value))
          : onChange?.(newValue?.value)
      }
      options={options?.map(stringToOption)}
      {...selectInputProps}
    />
  );
});
