import { Schema } from '../schema';

export type SchemaFetcher = () => Promise<Schema>;

export type GraphQLFetcher = (param: {
  query: string;
  variables: any;
}) => Promise<Record<string, any>>;

export interface DataManagerProps {
  schema: Schema | undefined;
  gqlFetcher: GraphQLFetcher;
}

export type RelFieldOption = Record<string, string>;

type DetailFieldValue = string | { label: string; value: string }[];

export type DetailField = {
  fieldName: string;
  fieldType: string;
  fieldLink: string;
  fieldValue: DetailFieldValue;
  required: boolean;
};

type FieldValue =
  | string
  | { name: string; id: string }
  | { name: string; id: string }[];

export interface GraphqlFetchResult {
  currentModelName: string;
  fields: { name: string; rel: string }[];
  data: Record<string, FieldValue>[];
  relTypeOptions?: any;
}
