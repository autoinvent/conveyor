import { Controller, useFormContext } from 'react-hook-form';

import { ScalarTypes } from '@/enums';
import { Field } from '@/types';

import { SelectInput } from './SelectInput';
import { SelectOption } from './types';

export interface FormInputProps {
  field: Field;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  className?: string;
}

export const FormInput = ({
  field,
  onOpenFieldSelect,
  className,
}: FormInputProps) => {
  const { control, register } = useFormContext();

  switch (field.type) {
    case ScalarTypes.STRING:
      return (
        <input
          type="text"
          className={className}
          {...register(field.name, { required: field.required })}
        />
      );
    case ScalarTypes.INT:
      return (
        <input
          type="number"
          className={className}
          {...register(field.name, { required: field.required })}
        />
      );
    case ScalarTypes.FLOAT:
      return (
        <input
          type="number"
          className={className}
          {...register(field.name, { required: field.required })}
        />
      );
    case ScalarTypes.DATETIME:
      return (
        <Controller
          name={field.name}
          control={control}
          rules={{ required: field.required }}
          render={({ field: { value, ...rest } }) => (
            <input
              value={value.slice(0, -3)}
              type="datetime-local"
              className={className}
              {...rest}
            />
          )}
        />
      );
    case ScalarTypes.BOOLEAN:
      return (
        <input
          type="checkbox"
          className={className}
          {...register(field.name, { required: field.required })}
        />
      );
    default:
      return (
        <Controller
          name={field.name}
          control={control}
          rules={{ required: field.required }}
          render={({ field: { value, onChange } }) => {
            return (
              <SelectInput
                fieldName={field.name}
                value={JSON.stringify(value ? value.id : null)}
                onValueChange={(newValue) => {
                  onChange({ id: JSON.parse(newValue) });
                  return newValue;
                }}
                required={field.required}
                onOpenFieldSelect={onOpenFieldSelect}
                className={className}
              />
            );
          }}
        />
      );
  }
};
