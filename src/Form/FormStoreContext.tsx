import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from 'react-hook-form';

export interface FormState<D extends FieldValues>
  extends UseFormReturn<D> {

}
export const FormStoreProvider = FormProvider
