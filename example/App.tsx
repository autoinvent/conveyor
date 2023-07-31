import { request } from "graphql-request";

import {
  ConveyorAdmin,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../src";

function App() {
  // Fetcher to retrieve introspection from endpoint
  const introspectionFetcher = async (params: { document: string }) => {
    const url = `https://localhost/dc/api/graphiql`;
    return request(url, params.document);
  };
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const graphQLUrl = "/api/graphql";
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
    />
  );
}

export default App;
