import { createContext, ReactNode, useMemo } from 'react';

import { ModelData, ModelField } from '../types';

interface ModelTableContext {
  fields: ModelField[];
  tableData: ModelData[];
  editable: boolean;
  initialDisplayKey: string;
}
export const ModelTableContext = createContext<ModelTableContext>({
  fields: [],
  tableData: [],
  editable: false,
  initialDisplayKey: '',
});

interface ModelTableProviderProps {
  value: ModelTableContext;
  children: ReactNode;
}

export const ModelTableProvider = ({
  value,
  children,
}: ModelTableProviderProps) => {
  const modelTable = useMemo(() => value, [JSON.stringify(value)]);
  return (
    <ModelTableContext.Provider value={modelTable}>
      {children}
    </ModelTableContext.Provider>
  );
};
