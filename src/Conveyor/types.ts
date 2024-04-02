import { DataType } from '@/types';

export interface ModelType {
  fields?: Record<string, FieldType>;
  display?: (modelData: DataType) => string;
}

export interface FieldType {
  baseType?: string;
  create?: string;
  delete?: string;
  update?: string;
  item?: string;
}

export type ScalarTypes = 'String' | 'Int' | 'Float' | 'DateTime' | 'Boolean';
