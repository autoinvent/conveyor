import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { cn } from '@/lib/utils';

import type { InputRenderFnProps } from '@/Form';
import type { SelectOption } from '@/types';

export interface SelectInputProps extends InputRenderFnProps {
  options?: SelectOption[];
  placeHolder?: string;
}

export const SelectInput = ({
  options = [],
  placeHolder = 'Select...',
  inputProps: { onChange, value, name },
  disabled,
  required,
  className,
}: SelectInputProps) => {
  const stringifiedValue = value !== '' ? JSON.stringify(value) : value;
  const stringifiedOptions = options.map(({ label, value }) => {
    const stringifiedOptionValue = JSON.stringify(value);
    return { label, value: stringifiedOptionValue };
  });
  return (
    <span className={className}>
      <Select
        name={name}
        value={stringifiedValue}
        onValueChange={(val) => {
          const parsedVal = JSON.parse(val);
          onChange(parsedVal);
        }}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              <span className="text-muted-foreground">{placeHolder}</span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {stringifiedOptions.length > 0 ? (
            stringifiedOptions.map(({ label, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })
          ) : (
            <div className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              No Options
            </div>
          )}
        </SelectContent>
      </Select>
    </span>
  );
};
