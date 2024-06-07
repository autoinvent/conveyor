import {
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
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
  const [store] = useState(() =>
    createStore(immer<FormState>(() => ({ ...methods }))),
  );

  const isMounted = useRef(false);
  /*
    biome-ignore lint/correctness/useExhaustiveDependencies:
      The reference to methods does not matter, only the contents.
  */
  useEffect(() => {
    if (isMounted.current) store.setState(() => methods);
  }, [...Object.values(methods), store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <FormStoreContext.Provider value={store}>
      {children}
    </FormStoreContext.Provider>
  );
};
