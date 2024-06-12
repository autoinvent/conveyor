import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FormProvider,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// zustand's (v4.5.2) immer middleware does not play nicely with react-hook-form's(7.51.4)
// control and formState props in typescript
export interface FormState
  extends Omit<UseFormReturn, 'control' | 'formState'> {
  control: any;
  formState: any;
}

export const FormStoreContext = createContext<StoreApi<FormState> | undefined>(
  undefined,
);

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
