import { createContext, ReactNode } from 'react';

export const ModelEditableContext = createContext<boolean>(false);

interface ModelEditableProviderProps {
  value: boolean;
  children: ReactNode;
}

export const ModelEditableProvider = ({
  value,
  children,
}: ModelEditableProviderProps) => {
  return (
    <ModelEditableContext.Provider value={value}>
      {children}
    </ModelEditableContext.Provider>
  );
};
