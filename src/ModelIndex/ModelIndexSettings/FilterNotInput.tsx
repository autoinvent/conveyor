import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';

import { useFormStore, type InputRenderFnProps } from '@/Form';
import type { SelectOption } from '@/types';

export interface FilterNotInputProps extends InputRenderFnProps {
  notOptions?: SelectOption[];
}

export const FilterNotInput = ({
  notOptions = [
    { label: 'is', value: false },
    { label: 'is not', value: true },
  ],
  inputProps: { value, onChange, name },
}: FilterNotInputProps) => {
  const strValue = JSON.stringify(value);
  const strNotOptions = notOptions.map(({ label, value }) => {
    const strOptionValue = JSON.stringify(value);
    return { label, value: strOptionValue };
  });
  const watch = useFormStore((state) => state.watch);
  const path = watch('path');
  return (
    <Select
      name={name}
      value={strValue}
      onValueChange={(newVal) => {
        onChange(JSON.parse(newVal));
      }}
      disabled={!path}
    >
      <SelectTrigger className="max-w-fit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {strNotOptions.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
