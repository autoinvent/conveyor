import { Field } from '@/types';

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
  fieldNames: string[],
  models: Record<string, ModelType>,
) => {
  const currFields = models[model]?.fields;
  if (!currFields) return [];
  return fieldNames.map((fieldName) => {
    const baseType = currFields[fieldName]?.baseType;
    if (!baseType) return '';
    if (!models[baseType]) return fieldName;
    const primaryKeys = getPrimaryKeys(models[baseType]);
    return `${fieldName} { ${primaryKeys.join(' ')} }`;
  });
};

export const getItemFieldParams = (
  model: string,
  fieldNames: string[],
  models: Record<string, ModelType>,
) => {
  const currFields = models[model]?.fields;
  if (!currFields) return { inputVariables: [], queryArgs: [] };
  return {
    inputVariables: fieldNames.map(
      (fieldName) => `$${fieldName}: ${currFields[fieldName].item}`,
    ),
    queryArgs: fieldNames.map((fieldName) => `${fieldName}: $${fieldName}`),
  };
};

export const getUpdateFieldParams = (
  model: string,
  fieldNames: string[],
  models: Record<string, ModelType>,
) => {
  const currFields = models[model]?.fields;
  if (!currFields) return { inputVariables: [], queryArgs: [] };
  return {
    inputVariables: fieldNames.map(
      (fieldName) => `$${fieldName}: ${currFields[fieldName].update}`,
    ),
    queryArgs: fieldNames.map((fieldName) => `${fieldName}: $${fieldName}`),
  };
};

export const getCreateFieldParams = (
  model: string,
  fieldNames: string[],
  models: Record<string, ModelType>,
) => {
  const currFields = models[model]?.fields;
  if (!currFields) return { inputVariables: [], queryArgs: [] };
  return {
    inputVariables: fieldNames.map(
      (fieldName) => `$${fieldName}: ${currFields[fieldName].create}`,
    ),
    queryArgs: fieldNames.map((fieldName) => `${fieldName}: $${fieldName}`),
  };
};

export const parseMQLBaseType = (type: string): string => {
  if (type.charAt(0) === '[') {
    if (type.charAt(type.length - 1) !== ']') {
      throw new Error('Invalid MQL type!');
    }
    return parseMQLBaseType(type.substring(1, type.length - 1));
  } else if (type.charAt(type.length - 1) === '!') {
    return parseMQLBaseType(type.substring(0, type.length - 1));
  } else {
    return type;
  }
};

export const parseMQLType = (fieldName: string, type: string = ''): Field => {
  const baseType = parseMQLBaseType(type);
  const required = type.includes(`${baseType}!`);
  const many = type.charAt(0) === '[';
  const editable = !!type && fieldName !== 'id';
  return { name: fieldName, type: baseType, required, many, editable };
};
