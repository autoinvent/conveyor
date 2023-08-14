import { request } from "graphql-request";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  ConveyorAdmin,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../src";

function App() {
  const queryClient = new QueryClient();
  const graphQLUrl = "/graphql";
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const useGQLQueryResponse: UseGQLQueryResponse = (graphQLParams) => {
    const actionModel = graphQLParams.action
      ? graphQLParams.action.split("_")[0]
      : "unknown";
    const fetcher = () =>
      request(graphQLUrl, graphQLParams.document, graphQLParams.variables);
    const { isLoading, isError, error, data } = useQuery({
      queryKey: [actionModel, graphQLParams],
      queryFn: () =>
        request(graphQLUrl, graphQLParams.document, graphQLParams.variables),
    });
    return new Promise((resolve, reject) => {
      if (!isLoading) {
        if (isError) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    });
  };
  const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
    const actionModel = graphQLParams.action
      ? graphQLParams.action.split("_")[0]
      : "unknown";
    const fetcher = (options: any) =>
      request(
        graphQLUrl,
        graphQLParams.document,
        options?.variables ?? graphQLParams.variables
      );
    const { isLoading, isError, error, data, mutate } = useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [actionModel] });
      },
      mutationFn: fetcher,
    });

    return (options) => {
      mutate(options);
      return new Promise((resolve, reject) => {
        if (!isLoading) {
          if (isError) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      });
    };
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorAdmin
        useGQLQueryResponse={useGQLQueryResponse}
        useGQLMutationRequest={useGQLMutationRequest}
        secondaryKeys={["name", "username"]}
      />
    </QueryClientProvider>
  );
}

export default App;
