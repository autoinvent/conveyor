import { createContext, ReactNode } from 'react';

import { ModelData } from '../__types';

export const ModelDataContext = createContext<string>('');

interface ModelDataProviderProps {
  value: ModelData;
  children: ReactNode;
}

export const ModelDataProvider = ({
  value,
  children,
}: ModelDataProviderProps) => {
  return (
    <ModelDataContext.Provider value={JSON.stringify(value)}>
      {children}
    </ModelDataContext.Provider>
  );
};
