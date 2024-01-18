import { request } from 'graphql-request';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import {
//   ConveyorAdmin,
//   UseGQLQueryResponse,
//   UseGQLMutationRequest,
// } from '../src';

import Conveyor from '../src/aaadmin/components/Conveyor';
import {
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from '../src/aaadmin/contexts/ConveyorContext';

function App() {
  const queryClient = new QueryClient();
  const gqlUrl = '/graphql';
  const errorHandler = (error: any) => {
    let errorMessages = null;
    if (typeof error?.message === 'string') {
      const matches = error.message.match(/\{".*\}/g);
      if (matches) {
        const parsedError = JSON.parse(matches[0]);
        // rome-ignore lint: not confusing
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
  const useGQLQueryResponse: UseGQLQueryResponse = (param) => {
    // const actionModel = graphQLParams.action
    //   ? graphQLParams.action.split('_')[0]
    //   : 'unknown';
    // const response = useQuery({
    //   queryKey: [actionModel, graphQLParams],
    //   queryFn: () =>
    //     request(gqlUrl, graphQLParams.document, graphQLParams.variables),
    // });
    // return handleResponse(response);
    const response: any = useQuery({
      queryKey: [param.operation],
      queryFn: async () => {
        const response = await request(gqlUrl, param.document, param.variables);
        return response;
      },
    });
    return { data: response.data, errors: response.error };
  };
  const useGQLMutationRequest: UseGQLMutationRequest = (param) => {
    // const actionModel = graphQLParams.action
    //   ? graphQLParams.action.split('_')[0]
    //   : 'unknown';
    // const response = useMutation({
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: [actionModel] });
    //   },
    //   mutationFn: (options: any) =>
    //     request(gqlUrl, graphQLParams.document, options?.variables),
    // });

    // return (options) => {
    //   response.mutate(options);
    //   return handleResponse(response);
    // };
    return () => Promise.resolve({});
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Conveyor
        useGQLQueryResponse={useGQLQueryResponse}
        useGQLMutationRequest={useGQLMutationRequest}
      />
    </QueryClientProvider>
  );
}

export default App;
