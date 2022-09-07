export type RelationalFieldType = {
  name: string;
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
  const LIST_SUFFIX = 's';
  return `${modelName}${LIST_SUFFIX}`; // TODO: change 's' to 'List'
}

export function getAllModelNames(schema: Schema | undefined) {
  return schema?.models.map((model) => model.name) ?? [];
}
