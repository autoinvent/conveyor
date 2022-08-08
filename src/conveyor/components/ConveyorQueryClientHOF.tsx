import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { SchemaFetcher, GraphQLFetcher } from './commons/types';

function ConveyorQueryClientHOF(WrappedComponent: any) {
  const queryClient = new QueryClient();
  const component = ({
    schemaFetcher,
    gqlFetcher,
  }: {
    schemaFetcher: SchemaFetcher;
    gqlFetcher: GraphQLFetcher;
  }) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent schemaFetcher={schemaFetcher} gqlFetcher={gqlFetcher} />
    </QueryClientProvider>
  );
  return component;
}

export default ConveyorQueryClientHOF;
