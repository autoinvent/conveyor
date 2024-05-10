import { Controller, useFormContext } from 'react-hook-form';

import { ScalarTypes } from '@/enums';
import { Field } from '@/types';

import { ModelSelectInput } from './ModelSelectInput';
import { SelectOption } from './types';

export interface ModelFormInputProps {
  field: Field;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  className?: string;
}

export const ModelFormInput = ({
  field,
  onOpenFieldSelect,
  className,
}: ModelFormInputProps) => {
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
              <ModelSelectInput
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
