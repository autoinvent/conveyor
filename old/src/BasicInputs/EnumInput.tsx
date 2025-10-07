import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import type { SelectOption } from '@/types';

import { SelectInput } from './SelectInput';

export const EnumInput = forwardRef<
  ElementRef<typeof SelectInput>,
  Omit<ComponentPropsWithoutRef<typeof SelectInput>, 'value' | 'options'> & {
    value?: string | string[];
    options: (string | SelectOption)[];
  }
>(({ value, onChange, options, ...selectInputProps }, ref) => {
  const stringToOption = (str: string) => ({
    label: str,
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
      options={options?.map((option) =>
        typeof option === 'string' ? stringToOption(option) : option,
      )}
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
