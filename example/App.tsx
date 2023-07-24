import { request } from 'graphql-request';

import { Conveyor, GraphQLFetcher } from '../src';
import autoInventAdapter from './schemaAdapter';

function App() {
  // Fetcher to retrieve schema from endpoint
  const schemaUrl = '/api/schema';
  const schemaFetcher = async () => {
    const response = await fetch(schemaUrl);
    const remoteSchemaResponse = await response.json();
    return autoInventAdapter(remoteSchemaResponse.definitions);
  };
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const graphQLUrl = '/api/graphql';
  const graphqlFetcher: GraphQLFetcher = async (graphQLParams) => {
    return await request(
      graphQLUrl,
      graphQLParams.request,
      graphQLParams.variables,
    );
  };

  return <Conveyor schemaFetcher={schemaFetcher} gqlFetcher={graphqlFetcher} />;
}

export default App;
