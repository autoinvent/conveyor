import { createContext, ReactNode, useMemo } from 'react';

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
  return (
    <ModelDataContext.Provider value={modelData}>
      {children}
    </ModelDataContext.Provider>
  );
};
