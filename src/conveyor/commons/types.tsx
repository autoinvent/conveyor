export type GraphQLFetcher = (param: { query: string; variables: any }) => any;

export type QueryFetcher = () => any;
