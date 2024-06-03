import { type Field, ScalarTypes } from '@/types';

export const toField = (str: string | Field): Field => {
  if (typeof str === 'object') {
    if (str.name && str.type) {
      return str;
    }
    throw new Error(`${JSON.stringify(str)} must be of type Field.`);
  }
  return {
    name: str,
    type: str === 'id' ? ScalarTypes.ID : ScalarTypes.STRING,
    many: false,
    required: false,
    sortable: true,
    editable: str !== 'id',
  };
};

export const isModelType = (field: Field) => {
  return !(Object.values(ScalarTypes) as string[]).includes(field.type);
};
