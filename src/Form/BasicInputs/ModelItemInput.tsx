import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';

import type { InputRenderFnProps } from '@/Form';
import type { SelectOption } from '@/types';

export interface ModelItemInputProps extends InputRenderFnProps {
  options?: SelectOption[];
}

export const ModelItemInput = ({
  inputProps: { onChange, value, name, disabled, required },
  options = [],
}: ModelItemInputProps) => {
  const valueStr = JSON.stringify(value?.id ?? null);
  if (options.length === 0) {
    if (!required) {
      options.push({ value: null, label: 'None' });
    }
    if (value) {
      options.push({
        value: value?.id,
        label: typeof value?.id === 'string' ? value.id : valueStr,
      });
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
          <div className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            No Options
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
