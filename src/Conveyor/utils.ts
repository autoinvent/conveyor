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

export const parseMQLType = (type: string) => {
  const baseType = parseMQLBaseType(type);
  const required = type.includes(`${baseType}!`);
  const isArray =
    type.charAt(0) === '[' && type.charAt(type.length - 1) === ']';

  return { baseType, required, isArray };
};
