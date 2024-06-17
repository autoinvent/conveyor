import type { ReactNode } from 'react';
import {
  FormProvider,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';

export interface FormState
  extends Omit<UseFormReturn, 'control' | 'formState'> {
  control: any;
  formState: any;
}

export interface FormStoreProviderProps extends UseFormProps {
  children?: ReactNode;
}
export const FormStoreProvider = ({
  children,
  ...formProps
}: FormStoreProviderProps) => {
  const methods = useForm(formProps);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
