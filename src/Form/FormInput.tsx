import { type ControllerProps, Controller } from 'react-hook-form';

import { useFormStore } from './useFormStore';

export type InputRenderFn = ControllerProps['render'];

export interface FormInputProps extends Omit<ControllerProps, 'control'> {}

export const FormInput = (props: FormInputProps) => {
  const control = useFormStore((state) => state.control);

  return <Controller {...props} control={control} />;
};
