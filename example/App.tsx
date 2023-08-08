import { request } from "graphql-request";

import {
  ConveyorAdmin,
  UseGQLQueryResponse,
  UseGQLMutationRequest,
} from "../src";

function App() {
  const graphQLUrl = "/graphql";
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
      useGQLQueryResponse={useGQLQueryResponse}
      useGQLMutationRequest={useGQLMutationRequest}
      primaryKey="id"
      secondaryKeys={["name", "username"]}
    />
  );
}

export default App;
