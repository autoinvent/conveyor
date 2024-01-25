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
import ModelIndex from '../src/aaadmin/components/ModelIndex';
import Conveyor from '../src/aaadmin/components/Conveyor';
import {
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from '../src/aaadmin/contexts/ConveyorContext';
import ConveyorRoute from '../src/aaadmin/components/ConveyorRoute';
import { StrictMode } from 'react';
import ModelTable from '../src/aaconveyor/components/ModelTable';
import ModelHeading from '../src/aaconveyor/components/ModelHeading';
import ModelTableHead from '../src/aaconveyor/components/ModelTableHead';
import ModelTableHeader from '../src/aaconveyor/components/ModelTableHeader';
import ModelTableCell from '../src/aaconveyor/components/ModelTableCell';
import ModelTableBody from '../src/aaconveyor/components/ModelTableBody';
import ModelTableRow from '../src/aaconveyor/components/ModelTableRow';
import ModelTablePagination from '../src/aaconveyor/components/ModelTablePagination';
import ModelTitle from '../src/aaconveyor/components/ModelTitle';
import FieldValue from '../src/aaconveyor/components/FieldValue';

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
    const model = (param.operation ?? '').replace(/_list/, '');
    const response: any = useQuery({
      queryKey: [model],
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
    const model = (param.operation ?? '').replace(/_update/, '');
    const mutate: any = useMutation({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [model] }),
      mutationFn: async (vars: any) => {
        const response = await request(gqlUrl, param.document, vars);
        return response;
      },
    });
    return (vars) => mutate.mutateAsync(vars);
    // return () => Promise.resolve({});
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Conveyor
        useGQLQueryResponse={useGQLQueryResponse}
        useGQLMutationRequest={useGQLMutationRequest}
      >
        {/* <ConveyorRoute path=':model'>
          <ModelIndex modelName='Task' fields={['message']}>
            <ModelTable>
              <ModelHeading>
                <ModelTitle />
                <div>Filter</div>
              </ModelHeading>
              <ModelTableHead />
              <ModelTableBody>
                <ModelTableRow>
                  <ModelTableCell field={'message'}>
                    <FieldValue field={'message'} />
                  </ModelTableCell>
                </ModelTableRow>
              </ModelTableBody>
              <ModelTablePagination />
            </ModelTable>
          </ModelIndex>
        </ConveyorRoute> */}
      </Conveyor>
    </QueryClientProvider>
  );
}

export default App;
