import { type Field, ScalarTypes } from '@/types';

export const toField = (field: string | Field): Field => {
  if (
    !(typeof field === 'object' || typeof field === 'string') ||
    field === '' ||
    (typeof field === 'object' && (!field.name || !field?.type))
  ) {
    throw new Error(
      'field must be a non-empty string or an object of type Field.',
    );
  }

  if (typeof field === 'string') {
    return {
      name: field,
      type: field === 'id' ? ScalarTypes.ID : ScalarTypes.STRING,
      sortable: true,
      editable: field !== 'id',
    };
  }

  return Object.assign({ required: true, editable: true }, field);
};
