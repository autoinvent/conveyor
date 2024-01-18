import { createContext, ReactNode, useMemo } from 'react';

import { ModelData, ModelField } from '../types';
import { DisplayKeys } from './DisplayKeyContext';

interface ModelTableContext {
  title: ReactNode;
  fields: ModelField[];
  data: ModelData[];
  showActions: boolean;
  initialDisplayKey: string;
}
export const ModelTableContext = createContext<ModelTableContext>({
  title: null,
  fields: [],
  data: [],
  showActions: false,
  initialDisplayKey: '',
});

interface ModelTableProviderProps {
  title?: ReactNode;
  data: ModelData[];
  fields: ModelField[];
  showActions?: boolean;
  initialDisplayKey?: string;
  onSave?: Function;
  onDelete?: Function;
  children?: ReactNode;
}

export const ModelTableProvider = ({
  title,
  data,
  fields,
  showActions = true,
  initialDisplayKey = DisplayKeys.VALUE,
  children,
}: ModelTableProviderProps) => {
  const modelTable = { title, data, fields, showActions, initialDisplayKey };
  const value = useMemo(() => modelTable, [JSON.stringify(modelTable)]);
  return (
    <ModelTableContext.Provider value={value}>
      {children}
    </ModelTableContext.Provider>
  );
};
