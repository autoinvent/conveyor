import * as R from 'ramda';

export type GraphQLFetcher = (param: { query: string; variables: any }) => any;

export type RelationalFieldType = {
  name: string;
  args?: any;
};

export type ModelField = {
  title: string;
  type: string | RelationalFieldType;
  required: boolean;
};

export type Model = {
  title: string;
  title_plural: string;
  name: string;
  fields: ModelField[];
};

export type Schema = {
  models: Model[];
};

export function getModelByPropName(
  schema: Schema,
  propName: string,
  propValue: string,
) {
  const model = R.find(R.propEq(propName, propValue), schema.models);
  if (!model) throw new Error('Model does not exist.');
  return model;
}

export function getModels(schema: Schema) {
  return schema.models;
}

export function getModelTitle(model: Model) {
  return model.title;
}

export function getModelPluralTitle(model: Model) {
  return model.title_plural;
}

export function getModelName(model: Model) {
  return model.name;
}

export function getModelFields(model: Model) {
  return model.fields;
}

export function getFieldTitle(field: ModelField) {
  return field.title;
}

export function getFieldType(field: ModelField) {
  return field.type;
}

export function getFieldRequired(field: ModelField) {
  return field.required;
}

export function getGraphQLFieldName(fieldTitle: string) {
  return `${fieldTitle} { name }`;
}
