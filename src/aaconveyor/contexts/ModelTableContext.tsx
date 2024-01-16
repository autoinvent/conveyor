import { createContext, ReactNode, useMemo } from 'react';

import { ModelData, ModelField } from '../types';
import { DisplayKeys } from './DisplayKeyContext';

interface ModelTableContext {
  fields: ModelField[];
  data: ModelData[];
  editable: boolean;
  initialDisplayKey: string;
}
export const ModelTableContext = createContext<ModelTableContext>({
  fields: [],
  data: [],
  editable: false,
  initialDisplayKey: '',
});

interface ModelTableProviderProps {
  data: ModelData[];
  fields: ModelField[];
  editable?: boolean;
  initialDisplayKey?: string;
  onSave?: Function;
  onDelete?: Function;
  children?: ReactNode;
}

export const ModelTableProvider = ({
  data,
  fields,
  editable = true,
  initialDisplayKey = DisplayKeys.VALUE,
  children,
}: ModelTableProviderProps) => {
  const modelTable = { data, fields, editable, initialDisplayKey }
  const value = useMemo(() => modelTable, [JSON.stringify(modelTable)]);
  return (
    <ModelTableContext.Provider value={value}>
      {children}
    </ModelTableContext.Provider>
  );
};
