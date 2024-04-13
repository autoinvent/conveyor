import { DataType } from '@/Data';

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