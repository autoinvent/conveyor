import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { ScalarTypes } from '@/enums';
import type { Field } from '@/types';

import { ModelSelectInput } from './ModelSelectInput';
import type { SelectOption } from './types';

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
          className={twMerge(
            'w-full px-1.5 bg-[--bg-accent] h-full',
            className,
          )}
          {...register(field.name, {
            required: field.required ? `${field.name} is required.` : false,
          })}
        />
      );
    case ScalarTypes.INT:
      return (
        <input
          type="number"
          className={twMerge(
            'w-full px-1.5 bg-[--bg-accent] h-full',
            className,
          )}
          {...register(field.name, {
            required: field.required ? `${field.name} is required.` : false,
          })}
        />
      );
    case ScalarTypes.FLOAT:
      return (
        <input
          type="number"
          className={twMerge(
            'w-full px-1.5 bg-[--bg-accent] h-full',
            className,
          )}
          {...register(field.name, {
            required: field.required ? `${field.name} is required.` : false,
          })}
        />
      );
    case ScalarTypes.DATETIME:
      return (
        <Controller
          name={field.name}
          control={control}
          rules={{
            required: field.required ? `${field.name} is required.` : false,
          }}
          render={({ field: { value, ...rest } }) => (
            <input
              value={value?.slice(0, -3)}
              type="datetime-local"
              className={twMerge(
                'w-full px-1.5 bg-[--bg-accent] h-full',
                className,
              )}
              {...rest}
            />
          )}
        />
      );
    case ScalarTypes.BOOLEAN:
      return (
        <span className="h-full w-full flex justify-center min-w-[42px] min-h-[38px] p-[1px] bg-[--bg-accent] align-baseline">
          <input
            type="checkbox"
            className={twMerge(
              'text-center justify-center align-middle p-0.5 bg-[--bg-accent]',
              className,
            )}
            {...register(field.name, {
              required: field.required ? `${field.name} is required.` : false,
            })}
          />
        </span>
      );
    default:
      return (
        <Controller
          name={field.name}
          control={control}
          rules={{
            required: field.required ? `${field.name} is required.` : false,
          }}
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
                className={twMerge(
                  'w-full px-1.5 bg-[--bg-accent] h-full',
                  className,
                )}
              />
            );
          }}
        />
      );
  }
};
