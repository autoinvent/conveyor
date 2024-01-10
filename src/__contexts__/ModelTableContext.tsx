import {
  createContext,
  ReactNode,
  useMemo,
} from 'react';

import { ModelData, ModelField } from '../__types';

interface ModelTableContext {
  fields: ModelField[];
  tableData: ModelData[];
  editable: boolean;
}
export const ModelTableContext = createContext<ModelTableContext>({
  fields: [],
  tableData: [],
  editable: false,
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
