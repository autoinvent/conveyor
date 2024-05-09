export interface ModelType {
  fields?: Record<string, MQLFieldType>;
}

export interface MQLFieldType {
  baseType?: string;
  create?: string;
  delete?: string;
  update?: string;
  item?: string;
}
