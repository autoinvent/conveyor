export interface ModelType {
  fields?: Record<string, FieldType>;
}

export interface FieldType {
  baseType?: string;
  create?: string;
  delete?: string;
  update?: string;
  item?: string;
}
