import { Schema } from '../schema';

export type SchemaFetcher = () => Promise<Schema>;

export type GraphQLFetcher = (param: {
  request: string;
  variables: any;
}) => Promise<Record<string, any>>;

export interface DataManagerProps {
  schema: Schema | undefined;
  gqlFetcher: GraphQLFetcher;
}

export type RelFieldOption = Record<string, string | null>;

type SelectOption = { label: string; value: string | null };
export type DetailFieldValue = string | SelectOption[] | SelectOption | boolean;

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

export type ModelTableProps = {
  currentModelName: string;
  fields: { name: string; rel: string }[];
  data: Record<string, FieldValue>[];
};
