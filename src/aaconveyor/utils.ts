import { ModelField } from './types';

export const getFieldName = (field: ModelField) => {
  return typeof field === 'string' ? field : field.name;
};

export const getFieldType = (field: ModelField) => {
  return typeof field === 'string' ? field : field.name;
};
