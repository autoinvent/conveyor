export type RelationalFieldType = {
  args?: any;
};

export type ModelField = {
  name: string;
  type: string | RelationalFieldType;
  required: boolean;
};

export type Model = {
  name: string;
  fields: ModelField[];
};

export type Schema = {
  models: Model[];
};

export function toModelListName(modelName: string) {
  return `${modelName}s`; // TODO: change 's' to 'List'
}

export function getAllModelNames(schema: Schema | undefined) {
  return schema?.models.map((model) => model.name) ?? [];
}
