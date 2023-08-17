export interface BaseProps {
  id?: string;
  className?: string;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

export interface Field {
  required?: boolean;
  type?: string;
  related?: RelatedField;
}

export interface FieldData extends Field {
  displayLabelFn?: (field?: any) => any;
  displayValueFn?: (data?: any) => any;
}

export interface RelatedField {
  modelName: string;
  many: boolean;
  fields?: string[];
  fieldsData?: Record<string, FieldData>;
}

export interface Model {
  updateArgs?: Record<string, string>;
  createArgs?: Record<string, string>;
  fields: Record<string, Field>;
}
