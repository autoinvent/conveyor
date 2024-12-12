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
    value?: string | string[];
    options: string[];
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
      options={options?.map(stringToOption)}
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
