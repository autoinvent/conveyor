import { ModelType } from './types';

export const getPrimaryKeys = (model: ModelType | undefined) => {
  const fields = model?.fields;
  if (!fields) return ['id'];
  const primaryKeys: string[] = [];
  Object.keys(fields).forEach((fieldName) => {
    if (fields[fieldName].item) {
      primaryKeys.push(fieldName);
    }
  });
  return primaryKeys;
};

export const getQueryFields = (
  model: string,
  fields: string[],
  models: Record<string, ModelType>,
) => {
  const currFields = models[model]?.fields;
  if (!currFields) return [];
  return fields.map((field) => {
    const baseType = currFields[field]?.baseType;
    if (!baseType) return '';
    if (!models[baseType]) return field;
    const primaryKeys = getPrimaryKeys(models[baseType]);
    return `${field} { ${primaryKeys.join(' ')} }`;
  });
};
