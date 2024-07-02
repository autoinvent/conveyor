import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';

import { useFormStore, type InputRenderFnProps } from '@/Form';
import { humanizeText } from '@/utils';

export interface FilterPathInputProps extends InputRenderFnProps {
  fieldNames: string[];
}

export const FilterPathInput = ({
  fieldNames,
  inputProps: { value, onChange, name },
}: FilterPathInputProps) => {
  const resetField = useFormStore((state) => state.resetField);
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(newVal) => {
        resetField('not');
        resetField('op');
        resetField('value');
        onChange(newVal);
      }}
    >
      <SelectTrigger className="min-w-fit">
        <SelectValue placeholder="Select a field..." />
      </SelectTrigger>
      <SelectContent>
        {fieldNames.map((fieldName) => {
          return (
            <SelectItem key={fieldName} value={fieldName}>
              {humanizeText(fieldName)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
