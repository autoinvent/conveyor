import { ReactNode, createContext } from 'react';

export interface GQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, any>;
}

export interface UseGQLQueryResponseParam {
  document: string;
  variables?: Record<string, any>;
  operation?: string;
}

export interface UseGQLQueryResponseResponseReturn {
  data?: { [operation: string]: Record<string, any> };
  errors?: GQLError[];
}

export type UseGQLQueryResponse = (
  param: UseGQLQueryResponseParam,
) => UseGQLQueryResponseResponseReturn;

export interface UseGQLMutationRequestParam {
  document: string;
  operation?: string;
}

export type UseGQLMutationRequestReturn = (
  variables?: Record<string, any>,
) => Promise<UseGQLQueryResponseResponseReturn>;

export type UseGQLMutationRequest = (
  param: UseGQLMutationRequestParam,
) => UseGQLMutationRequestReturn;

export interface ConveyorContextType {
  useGQLQueryResponse: UseGQLQueryResponse;
  useGQLMutationRequest: UseGQLMutationRequest;
}

export const ConveyorContext = createContext<ConveyorContextType>({
  useGQLQueryResponse: () => ({
    errors: [{ message: 'useGQLQueryResponse was not defined.' }],
  }),
  useGQLMutationRequest: () => () =>
    Promise.reject(new Error('useGQLMutationRequest was not defined.')),
});

export interface ConveyorProviderProps {
  value: ConveyorContextType;
  children?: ReactNode;
}

export const ConveyorProvider = ({
  value,
  children,
}: ConveyorProviderProps) => {
  return (
    <ConveyorContext.Provider value={value}>
      {children}
    </ConveyorContext.Provider>
  );
};
