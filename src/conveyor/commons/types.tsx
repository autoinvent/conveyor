import { Schema } from '../schema';

export type SchemaFetcher = () => Promise<Schema>;
export type GraphQLFetcher = (param: { query: string; variables: any }) => any;
export type QueryFetcher = () => any;
