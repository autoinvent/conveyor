import { createContext, ReactNode, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ModelData } from '../types';

export const ModelDataContext = createContext<ModelData>({});

interface ModelDataProviderProps {
  value: ModelData;
  children: ReactNode;
}

export const ModelDataProvider = ({
  value,
  children,
}: ModelDataProviderProps) => {
  const modelData = useMemo(() => value, [JSON.stringify(value)]);
  const formMethods = useForm({ values: modelData, mode: 'onChange' });
  return (
    <ModelDataContext.Provider value={modelData}>
      <FormProvider {...formMethods}>{children}</FormProvider>
    </ModelDataContext.Provider>
  );
};
