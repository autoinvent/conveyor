export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export interface RelationType {
  modelName: string,
  many: boolean,
  type: string, // TODO: may be unecessary if ID type is used. 
}

export type Field = string | {
  name: string;
  type: string | RelationType;
  required?: boolean
  editable?: boolean
};

export type ModelData = Record<string, any>;
