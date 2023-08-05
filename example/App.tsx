import { request } from "graphql-request";

import {
  ConveyorAdmin,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../src";

function App() {
  const graphQLUrl = "/graphql";
  // Fetcher to retrieve introspection from endpoint
  const introspectionFetcher = async (params: { document: string }) => {
    return request(graphQLUrl, params.document);
  };
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const useGQLQueryResponse: UseGQLQueryResponse = (graphQLParams) => {
    return request(graphQLUrl, graphQLParams.document, graphQLParams.variables);
  };
  const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
    return (options) =>
      request(
        graphQLUrl,
        graphQLParams.document,
        options?.variables ?? graphQLParams.variables
      );
  };

  return (
    <ConveyorAdmin
      gqlIntrospectionFetcher={introspectionFetcher}
      useGQLQueryResponse={useGQLQueryResponse}
      useGQLMutationRequest={useGQLMutationRequest}
      keyFallbacks={['id', 'name', 'message']}
    />
  );
}

export default App;
