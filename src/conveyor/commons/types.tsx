import { Schema } from '../schema';

export type SchemaFetcher = () => Promise<Schema>;

export type GraphQLFetcher = (param: {
  query: string;
  variables: any;
}) => Promise<Record<string, { result: any }>>;

export interface DataManagerProps {
  schema: Schema | undefined;
  gqlFetcher: GraphQLFetcher;
}

type ModelData = string | { name: string; id: string } | { name: string; id: string }[];

export interface GraphqlFetchResult {
  currentModelName: string;
  fields: { name: string; rel: string }[];
  data: Record<string, ModelData>[];
}
