import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';

import type { InputRenderFnProps } from '@/Form';
import type { SelectOption } from '@/types';

export interface ModelListInputProps extends InputRenderFnProps {
  options?: SelectOption[];
}

export const ModelListInput = ({
  inputProps: { onChange, value, name },
  options = [],
  disabled,
  required,
}: ModelListInputProps) => {
  const valueStr = JSON.stringify(value?.id ?? null);
  if (options.length === 0) {
    if (!required) {
      options.push({ value: null, label: 'None' });
    }
    if (value !== null) {
      options.push({ value: value?.id, label: valueStr });
    }
  }
  return (
    <Select
      name={name}
      value={valueStr}
      onValueChange={(val) => {
        const parsedVal = JSON.parse(val);
        onChange(parsedVal !== null ? { id: parsedVal } : null);
      }}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {options.length > 0 ? (
          options.map((option) => {
            const optionValue = JSON.stringify(option.value);
            return (
              <SelectItem key={optionValue} value={optionValue}>
                {option.label}
              </SelectItem>
            );
          })
        ) : (
          <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none data-[disabled]:pointer-events-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50">
            No Options
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
