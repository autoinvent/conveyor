import type { AriaAttributes, CSSProperties, ReactNode } from 'react';
import {
  Controller,
  type ControllerFieldState,
  type ControllerProps,
  type ControllerRenderProps,
  type FieldValues,
  type UseFormStateReturn,
} from 'react-hook-form';

import { useFormStore } from './useFormStore';

export interface InputProps
  extends AriaAttributes,
    ControllerRenderProps<FieldValues, string> {
  id?: string;
  className?: string;
  style?: CSSProperties;
  required?: boolean;
}

export interface InputRenderFnProps {
  inputProps: InputProps;
  inputState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}
export type InputRenderFn = (props: InputRenderFnProps) => ReactNode;

export interface FormInputProps
  extends Omit<ControllerProps, 'control' | 'render'> {
  render: InputRenderFn;
}

export const FormInput = ({ render, ...rest }: FormInputProps) => {
  const control = useFormStore((state) => state.control);

  return (
    <Controller
      {...rest}
      control={control}
      render={({ field, fieldState, formState }) => (
        <>{render({ inputProps: field, inputState: fieldState, formState })}</>
      )}
    />
  );
};
