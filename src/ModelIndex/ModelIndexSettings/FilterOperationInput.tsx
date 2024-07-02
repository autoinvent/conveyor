import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';

import { useFormStore, type InputRenderFnProps } from '@/Form';
import { type Field, FieldTypes } from '@/types';

export const FILTER_OPERATIONS: Record<
  string,
  { label: string; value: string }[]
> = {
  [FieldTypes.ID]: [{ label: 'equal to', value: 'eq' }],
  [FieldTypes.STRING]: [
    { label: 'equal to', value: 'eq' },
    { label: 'like', value: 'like' },
  ],
  [FieldTypes.BOOLEAN]: [{ label: 'equal to', value: 'eq' }],
  [FieldTypes.INT]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
  [FieldTypes.FLOAT]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
  [FieldTypes.DATETIME]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
};

export interface FilterOperationInputProps extends InputRenderFnProps {
  operations?: typeof FILTER_OPERATIONS;
  fields: Field[];
}

export const FilterOperationInput = ({
  fields,
  operations = FILTER_OPERATIONS,
  inputProps: { value, onChange, name },
}: FilterOperationInputProps) => {
  const watch = useFormStore((state) => state.watch);
  const path = watch('path');
  const field = fields.find((field) => field.name === path);
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(newVal) => {
        onChange(newVal);
      }}
      disabled={!path}
    >
      <SelectTrigger className="min-w-fit">
        <SelectValue placeholder="Select an operation..." />
      </SelectTrigger>
      <SelectContent>
        {path && field && operations[field.type] ? (
          operations[field.type].map((operator) => {
            return (
              <SelectItem key={operator.value} value={operator.value}>
                {operator.label}
              </SelectItem>
            );
          })
        ) : (
          <div className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            No Operations Found.
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
