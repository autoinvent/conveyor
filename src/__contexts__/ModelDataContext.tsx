import { createContext, ReactNode } from 'react';

import { ModelData } from '../__types';

export const ModelDataContext = createContext<ModelData>({});

interface ModelDataProviderProps {
  value: ModelData;
  children: ReactNode;
}

export const ModelDataProvider = ({
  value,
  children,
}: ModelDataProviderProps) => {
  return (
    <ModelDataContext.Provider value={value}>
      {children}
    </ModelDataContext.Provider>
  );
};
