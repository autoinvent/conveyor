import { ScalarTypes } from '@/enums';
import { Field } from '@/types';

import { SelectInput } from './SelectInput';

export interface FieldInputProps {
  field: Field;
  value: any;
  onChange: (e: any) => any;
  inputProps?: Record<string, any>;
}

export const FieldInput = ({ field, value, onChange }: FieldInputProps) => {
  switch (field.type) {
    case ScalarTypes.STRING:
      return (
        <input
          value={value}
          onChange={onChange}
          type="text"
          required={!!field.required}
        />
      );
    case ScalarTypes.INT:
      return (
        <input
          value={value}
          onChange={onChange}
          type="number"
          required={!!field.required}
        />
      );
    case ScalarTypes.FLOAT:
      return (
        <input
          value={value}
          onChange={onChange}
          type="number"
          required={!!field.required}
        />
      );
    case ScalarTypes.DATETIME:
      return (
        <input
          value={value}
          onChange={onChange}
          type="datetime-local"
          required={!!field.required}
        />
      );
    case ScalarTypes.BOOLEAN:
      return (
        <input
          value={value}
          onChange={onChange}
          type="checkbox"
          required={!!field.required}
        />
      );
    default:
      return (
        <SelectInput value={value} onValueChange={onChange} options={[]} />
      );
  }
};
