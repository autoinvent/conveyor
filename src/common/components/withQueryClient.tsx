import { ComponentType } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function withQueryClient<T extends {}>(WrappedComponent: ComponentType<T>) {
  const component = (props: T) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
  return component;
}

export default withQueryClient;
