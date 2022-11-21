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

// A relational type could be a model name in plural form, typeToModelName will
// return the singular model name of the relational type; if the model does not exist,
// it will return an empty string
export function typeToModelName(schema: Schema, type: string | undefined) {
  const typeModel = schema?.models.find(
    (model) => model.name === type || toModelListName(model.name) === type,
  );
  return typeModel?.name ?? '';
}
