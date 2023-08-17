import { memo, FC, createContext, ReactNode } from 'react';

import { ErrorMessage } from '../enums';

import AlertsProvider from './AlertsContext';
import TableViewsProvider from './TableViewsContext';

export interface GQLRequestParams {
  document: string;
  variables?: Record<string, any>;
  action?: string;
  skip?: boolean;
}

// Returns the response of the request
export type UseGQLQueryResponse = (params: GQLRequestParams) => Promise<any>;

export type UseGQLMutationRequest = (
  params: GQLRequestParams,
) => (options?: { variables?: Record<string, any> }) => Promise<any>;

export type Navigate = (params: { modelName?: string; id?: string }) => void;

export interface ConveyorProviderProps {
  useGQLQueryResponse: UseGQLQueryResponse;
  useGQLMutationRequest: UseGQLMutationRequest;
  navigate: Navigate;
  primaryKey: string;
  secondaryKeys?: string[];
  children?: ReactNode;
}

const DEFAULT_CONTEXT = {
  useGQLQueryResponse: () =>
    Promise.reject({ errors: [{ message: ErrorMessage.USE_GQL_QUERY_DNE }] }),
  useGQLMutationRequest: () => () =>
    Promise.reject({
      errors: [{ message: ErrorMessage.USE_GQL_MUTATION_DNE }],
    }),
  navigate: () => {
    throw new Error(ErrorMessage.NAVIGATE_DNE);
  },
  primaryKey: 'id',
};

export const ConveyorContext =
  createContext<ConveyorProviderProps>(DEFAULT_CONTEXT);

const ConveyorProvider = ({
  useGQLQueryResponse = DEFAULT_CONTEXT.useGQLQueryResponse,
  useGQLMutationRequest = DEFAULT_CONTEXT.useGQLMutationRequest,
  navigate = DEFAULT_CONTEXT.navigate,
  primaryKey = DEFAULT_CONTEXT.primaryKey,
  secondaryKeys,
  children,
}: ConveyorProviderProps) => {
  return (
    <ConveyorContext.Provider
      value={{
        useGQLQueryResponse,
        useGQLMutationRequest,
        navigate,
        primaryKey,
        secondaryKeys,
      }}
    >
      <TableViewsProvider>
        <AlertsProvider>{children}</AlertsProvider>
      </TableViewsProvider>
    </ConveyorContext.Provider>
  );
};

export default memo(ConveyorProvider) as FC<ConveyorProviderProps>;
