import { memo, FC, createContext, ReactNode } from "react";

import { ErrorMessage } from "../enums";

import AlertsProvider from "./AlertsContext";
import TableViewsProvider from "./TableViewsContext";

export interface GQLRequestParams {
  action: string;
  document: string;
  variables?: Record<string, any>;
}

// Returns the response of the request
export type UseGQLQueryResponse = (params: GQLRequestParams) => Promise<any>;

export type UseGQLMutationRequest = (
  params: GQLRequestParams
) => (options?: { variables?: Record<string, any> }) => Promise<any>;

export type Navigate = (params: { modelName?: string; id?: string }) => void;

export interface ConveyorProviderProps {
  useGQLQueryResponse: UseGQLQueryResponse;
  useGQLMutationRequest: UseGQLMutationRequest;
  navigate: Navigate;
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
};
export const ConveyorContext = createContext(
  DEFAULT_CONTEXT as ConveyorProviderProps
);

const ConveyorProvider = ({
  useGQLQueryResponse,
  useGQLMutationRequest,
  navigate,
  children,
}: ConveyorProviderProps) => {
  return (
    <ConveyorContext.Provider
      value={{
        useGQLQueryResponse:
          useGQLQueryResponse ?? DEFAULT_CONTEXT.useGQLQueryResponse,
        useGQLMutationRequest:
          useGQLMutationRequest ?? DEFAULT_CONTEXT.useGQLMutationRequest,
        navigate: navigate ?? DEFAULT_CONTEXT.navigate,
      }}
    >
      <TableViewsProvider>
        <AlertsProvider>{children}</AlertsProvider>
      </TableViewsProvider>
    </ConveyorContext.Provider>
  );
};

export default memo(ConveyorProvider) as FC<ConveyorProviderProps>;
