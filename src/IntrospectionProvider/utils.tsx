import { MQLType } from './types';

export const extractMQLType = (type: MQLType): string => {
  switch (type.kind) {
    case 'NON_NULL':
      return `${extractMQLType(type.ofType)}!`;
    case 'LIST':
      return `[${extractMQLType(type.ofType)}]`;
    default:
      return String(type.name);
  }
};

export const extractMQLBaseType = (type: MQLType): string => {
  switch (type.kind) {
    case 'NON_NULL':
      return extractMQLBaseType(type.ofType);
    case 'LIST':
      return extractMQLBaseType(type.ofType);
    default:
      return String(type.name);
  }
};
