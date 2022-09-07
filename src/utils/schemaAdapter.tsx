import { Schema, ModelField } from '../conveyor/schema';

function autoInventAdapter(aiSchema: any): Schema {
  const modelTitles = Object.keys(aiSchema);
  modelTitles.pop();
  const modelNames = modelTitles.map((modelTitle) => String(modelTitle).toLowerCase());
  const modelPluralNames = modelNames.map((modelName) => `${modelName}s`);
  const relationalFieldTypes = modelNames.concat(modelPluralNames);
  const conveyorSchema = modelTitles.map((modelTitle) => {
    const fieldNames = Object.keys(aiSchema[modelTitle].fields);
    // Extracts conveyor schema fields
    const compatibleFields: ModelField[] = [];
    fieldNames.forEach((fieldName) => {
      // Gets rid of incompatible fields
      switch (fieldName) {
        case 'noEditField':
        case 'noViewField':
        case 'noViewField2':
          return;
        default:
          break;
      }
      // Sets compatible field meta data
      const currentField = aiSchema[modelTitle].fields[fieldName];
      let type = null;
      switch (currentField.type) {
        case 'string':
        case 'currency':
        case 'enum':
        case 'date':
        case 'boolean':
        case 'file':
        case 'creatable_string_select':
        case 'email':
        case 'phone':
        case 'text':
        case 'ID':
          type = currentField.type;
          break;
        default:
          if (relationalFieldTypes.includes(currentField.fieldName)) {
            type = {
              // FieldName is the closest representation to what type should be
              name: currentField.fieldName.toLowerCase(),
            };
          }
      }
      if (type) {
        const field = {
          name: String(fieldName),
          type,
          required: aiSchema[modelTitle].fields[fieldName].required,
        };
        compatibleFields.push(field);
      }
    });
    return {
      name: aiSchema[modelTitle].queryName,
      fields: compatibleFields,
    };
  });
  return { models: conveyorSchema };
}

export default autoInventAdapter;
