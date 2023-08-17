import { Model, Field } from '../types';
import { getBaseGQLType } from '../utils/gqlRequest';

interface IntrospectionType {
  name: string;
  kind?: string;
  ofType?: { name: string; kind: string };
  fields?: IntrospectionField[];
}
interface IntrospectionArgs {
  name: string;
  type: IntrospectionType;
}
interface IntrospectionField {
  name: string;
  args?: IntrospectionArgs[];
  type?: IntrospectionType;
}
interface Introspection {
  query: { fields: IntrospectionField[] };
  mutation: { fields: IntrospectionField[] };
}

const getFieldType: any = (type?: IntrospectionType) => {
  if (type?.kind === 'NON_NULL') {
    return `${getFieldType(type.ofType)}!`;
  } else if (type?.kind === 'LIST') {
    return `[${getFieldType(type?.ofType)}]`;
  } else {
    return type?.name;
  }
};

export const extractModelsFromIntrospection = (
  introspection: Introspection,
) => {
  const models: Record<string, Model> = {};
  // Extract models
  introspection.query.fields.forEach((query) => {
    if (query.name.endsWith('_item')) {
      const model = query.type?.name;
      if (model) {
        const fields: Record<string, Field> = {};
        query.type?.fields?.forEach((field) => {
          fields[field.name] = {};
          fields[field.name].type = getFieldType(field.type);
        });
        models[model] = { fields };
      }
    }
  });

  // Extract model update and create arguments
  introspection.mutation.fields.forEach((mutation) => {
    const mutationArgs = `${mutation.name.split('_')[1]}Args`;
    if (mutationArgs === 'updateArgs' || mutationArgs === 'createArgs') {
      const model = mutation.type?.ofType?.name;
      if (model) {
        models[model][mutationArgs] = Object.fromEntries(
          mutation.args?.map((arg) => [arg.name, getFieldType(arg.type)]) ?? [],
        );
      }
    }
  });

  // Parse model field type for relational types
  const modelNames = Object.keys(models);
  modelNames.forEach((model) => {
    Object.keys(models[model].fields).forEach((field) => {
      const { type } = models[model].fields[field];
      if (typeof type === 'string') {
        const baseType = getBaseGQLType(type);
        if (modelNames.includes(baseType)) {
          models[model].fields[field].related = {
            modelName: baseType,
            many: type.startsWith('['),
            fields: Object.keys(models[baseType].fields),
            fieldsData: models[baseType].fields,
          };
        }
      }
    });
  });

  // Set related field's fieldsData
  modelNames.forEach((model) => {
    Object.keys(models[model].fields).forEach((field) => {
      const { related } = models[model].fields[field];
      if (related) {
        related.fields = related.fields?.filter((field) => {
          const subRelated = related.fieldsData?.[field]?.related;
          return !subRelated;
        });
      }
    });
  });

  return models;
};
