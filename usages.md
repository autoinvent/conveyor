# Different ways to implement useGQLQueryResponse and useGQLMutationRequest

The following request api's will be implemented below:

- [fetch](using-fetch)
- [graphql-request](using-graphql-request)
- [@tanstack/react-query](using-@tanstack/react-query)

  Note: useGQLQueryResponse must return a promise and useGQLMutationRequest must return a function that returns a promise. The promise's in both cases must reject errors (string, string[], or Error) and resolve data (in the form of the graphql language).

## Using fetch:

```tsx
const gqlUrl = "/graphql";
const responseHandler = async (response: any) => {
  const parsedResponse = await response.json();
  if (parsedResponse?.data) {
    return parsedResponse.data;
  } else if (parsedResponse?.errors) {
    throw parsedResponse.errors;
  } else {
    throw parsedResponse;
  }
};
const useGQLQueryResponse: UseGQLQueryResponse = (graphQLParams) => {
  return fetch(gqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphQLParams.document,
      variables: graphQLParams.variables,
    }),
  }).then(responseHandler);
};
const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
  return (options) =>
    fetch(gqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphQLParams.document,
        variables: options?.variables,
      }),
    }).then(responseHandler);
};
```

## Using graphql-request

```tsx
const gqlUrl = "/graphql";
const errorHandler = (error: any) => {
  let errorMessages = null;
  if (typeof error?.message === "string") {
    const matches = error.message.match(/\{".*\}/g);
    if (matches) {
      const parsedError = JSON.parse(matches[0]);
      error = parsedError;
    }
  }
  if (error?.response) {
    if (Array.isArray(error?.response?.errors)) {
      errorMessages = error.response.errors.map((err: any) => err.message);
    }
  }
  if (!errorMessages) {
    throw Error(error);
  }
  throw errorMessages;
};
// Fetcher to retrieve GraphQL query/mutation from endpoint
const useGQLQueryResponse: UseGQLQueryResponse = (graphQLParams) => {
  return request(gqlUrl, graphQLParams.document, graphQLParams.variables).catch(
    errorHandler
  );
};
const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
  return (options) =>
    request(gqlUrl, graphQLParams.document, options?.variables).catch(
      errorHandler
    );
};
```

## Using @tanstack/react-query

```tsx
const queryClient = new QueryClient();
const gqlUrl = "/graphql";
const errorHandler = (error: any) => {
  let errorMessages = null;
  if (typeof error?.message === "string") {
    const matches = error.message.match(/\{".*\}/g);
    if (matches) {
      const parsedError = JSON.parse(matches[0]);
      error = parsedError;
    }
  }
  if (error?.response) {
    if (Array.isArray(error?.response?.errors)) {
      errorMessages = error.response.errors.map((err: any) => err.message);
    }
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
    ? graphQLParams.action.split("_")[0]
    : "unknown";
  const response = useQuery({
    queryKey: [actionModel, graphQLParams],
    queryFn: () =>
      request(gqlUrl, graphQLParams.document, graphQLParams.variables),
  });
  return handleResponse(response);
};
const useGQLMutationRequest: UseGQLMutationRequest = (graphQLParams) => {
  const actionModel = graphQLParams.action
    ? graphQLParams.action.split("_")[0]
    : "unknown";
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
```
