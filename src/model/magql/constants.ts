export const ScalarType = {
  ID: 'ID',
  STRING: 'String',
  INT: 'Int',
  FLOAT: 'Float',
  DATETIME: 'DateTime',
  BOOLEAN: 'Boolean',
} as const;

export const FieldType = {
  ...ScalarType,
  MODEL: '__MODEL__',
  ENUM: '__ENUM__',
} as const;
