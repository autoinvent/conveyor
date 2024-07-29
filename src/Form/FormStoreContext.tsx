import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form';

export interface FormState<D extends FieldValues> extends UseFormReturn<D> {}
export const FormStoreProvider = FormProvider;
