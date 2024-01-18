import { ModelField } from './types';

export const getFieldName = (field: ModelField) => {
  return typeof field === 'string' ? field : field.name;
};

export const getFieldType = (field: ModelField) => {
  return typeof field === 'string' ? 'String' : field.type;
};

export const getFieldRelationship = (field: ModelField) => {
  return typeof field === 'string' ? undefined : field.relationship;
}

export const humanizeText = (str: string) => {
  if (!str) return '';
  const separatedWords = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
