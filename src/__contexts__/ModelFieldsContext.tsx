import { createContext, ReactNode } from 'react';

import { ModelField } from '../__types';

export const ModelFieldsContext = createContext<ModelField[]>([]);

interface ModelFieldsProviderProps {
  value: ModelField[];
  children: ReactNode;
}

export const ModelFieldsProvider = ({
  value,
  children,
}: ModelFieldsProviderProps) => {
  return (
    <ModelFieldsContext.Provider value={value}>
      {children}
    </ModelFieldsContext.Provider>
  );
};
