import { request } from 'graphql-request';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  ConveyorAdmin,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from '../src';

function App() {
  const queryClient = new QueryClient();
  const gqlUrl = '/graphql';
  const errorHandler = (e: any) => {
    let errorMessages = null;
    let error = e;
    if (typeof error?.message === 'string') {
      const matches = error.message.match(/\{".*\}/g);
      if (matches) {
        const parsedError = JSON.parse(matches[0]);
        error = parsedError;
      }
    }
    if (error?.response && Array.isArray(error?.response?.errors)) {
      errorMessages = error.response.errors.map((err: any) => err.message);
    }
    if (!errorMessages) {
      throw Error(error);
    }
    return errorMessages;
  };
  const handleResponse = (response: any) => {
    return new Promise((resolve, reject) => {
      if (!response.isLoading) {
        if (response.isError) {
          reject(errorHandler(response.error));
        } else {
          resolve(response.data);
        }
      }
    });
  };
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const useGQLQueryResponse: UseGQLQueryResponse = (graphQLParams) => {
    const actionModel = graphQLParams.action
      ? graphQLParams.action.split('_')[0]
      : 'unknown';
    const response = useQuery({
      queryKey: [actionModel, graphQLParams],
      queryFn: () =>
        request(gqlUrl, graphQLParams.document, graphQLParams.variables),
    });
    return handleResponse(response);
  };
  const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
    const actionModel = graphQLParams.action
      ? graphQLParams.action.split('_')[0]
      : 'unknown';
    const response = useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [actionModel] });
      },
      mutationFn: (options: any) =>
        request(gqlUrl, graphQLParams.document, options?.variables),
    });

    return (options) => {
      response.mutate(options);
      return handleResponse(response);
    };
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorAdmin
        useGQLQueryResponse={useGQLQueryResponse}
        useGQLMutationRequest={useGQLMutationRequest}
        secondaryKeys={['name', 'username']}
      />
    </QueryClientProvider>
  );
}

export default App;
