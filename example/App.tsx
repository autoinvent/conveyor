import { useCallback, useContext, useEffect, useState } from 'react';
import { request } from 'graphql-request';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Conveyor, MQLRequest, ModelIndex, UseMQLOperation, Navbar, SlotsContext } from '@/index'


// const errorHandler = (error: any) => {
//   let errorMessages = null;
//   if (typeof error?.message === 'string') {
//     const matches = error.message.match(/\{".*\}/g);
//     if (matches) {
//       const parsedError = JSON.parse(matches[0]);
//       // rome-ignore lint: not confusing
//       error = parsedError;
//     }
//   }
//   if (error?.response && Array.isArray(error?.response?.errors)) {
//     errorMessages = error.response.errors.map((err: any) => err.message);
//   }
//   if (!errorMessages) {
//     throw Error(error);
//   }
//   return errorMessages;
// };
// const handleResponse = (response: any) => {
//   return new Promise((resolve, reject) => {
//     if (!response.isLoading) {
//       if (response.isError) {
//         reject(errorHandler(response.error));
//       } else {
//         resolve(response.data);
//       }
//     }
//   });
// };

function App() {
  const queryClient = new QueryClient();
  const gqlUrl = '/graphql';

  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const useMQLQuery: UseMQLOperation = ({ document, operationName }) => {
    const [enabled, setEnabled] = useState(false)
    const [variables, setVariables] = useState({} as Record<string, any> | undefined)
    const model = (operationName ?? '').replace(/_list/, '');
    const query: any = useQuery({
      queryKey: [model],
      queryFn: async () => {
        return request(gqlUrl, document, variables)
      },
      enabled
    });
    const mqlRequest: MQLRequest = useCallback((vars) => {
      if (!enabled) {
        setEnabled(true)
        setVariables(vars)
      }
      return new Promise((resolve, reject) => {
        if (!query.isLoading) {
          if (query.isSuccess) {
            resolve(query.data)
          } else {
            reject(query.error)
          }
        }
      })
    }, [query.isLoading, enabled])
    return mqlRequest
  };
  const useMQLMutation: UseMQLOperation = (param) => {
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

    // const model = (param.operation ?? '').replace(/_update/, '');
    // const mutate: any = useMutation({
    //   onSuccess: () => queryClient.invalidateQueries({ queryKey: [model] }),
    //   mutationFn: async (vars: any) => {
    //     const response = await request(gqlUrl, param.document, vars);
    //     return response;
    //   },
    // });
    // return (vars) => mutate.mutateAsync(vars);
    return () => Promise.resolve({});
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Conveyor useMQLQuery={useMQLQuery} useMQLMutation={useMQLMutation}>
        <Navbar modelNames={['Task']}></Navbar>
        <ModelIndex model="Task" fields={['message', 'created_at']} actionsConfig={{ showActions: true }}>
          <ModelIndex.Table>
          </ModelIndex.Table>
        </ModelIndex>
      </Conveyor>
    </QueryClientProvider>
  );
}

export default App;
