import type { ReactElement } from 'react';
import {
  type FieldValues,
  type ControllerFieldState,
  type ControllerRenderProps,
  type UseFormStateReturn,
  Controller,
  useFormContext,
} from 'react-hook-form';

import type { Field } from '@/types';

export interface InputRenderFnProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

export type InputRenderFn = ({
  field,
  fieldState,
  formState,
}: InputRenderFnProps) => ReactElement;

export interface ModelFormInputProps {
  field: Field;
  render: InputRenderFn;
}

export const ModelFormInput = ({ field, render }: ModelFormInputProps) => {
  const { control, register } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required ? `${field.name} is required.` : false,
      }}
      render={render}
    />
  );
};
