import { ReactNode } from 'react';
import { FormProvider, UseFormProps, useForm } from 'react-hook-form';

export interface FormProps extends UseFormProps {
  children?: ReactNode;
}

export const Form = ({ children, mode = 'onChange', ...props }: FormProps) => {
  const methods = useForm({ mode, ...props });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
