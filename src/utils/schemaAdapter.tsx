import * as R from 'ramda';
import { Schema, ModelField } from '../conveyor/schema/schema';

function autoInventAdapter(aiSchema: any): Schema {
  const modelTitles = R.keys(aiSchema);
  const modelNames = R.map(
    (modelTitle) => String(modelTitle).toLowerCase(),
    modelTitles,
  );
  const modelPluralNames = R.map((modelName) => `${modelName}s`, modelNames);
  const relationalFieldTypes = R.concat(modelNames, modelPluralNames);
  const conveyorSchema = R.map((modelTitle) => {
    const fieldNames = R.keys(aiSchema[modelTitle].fields);
    // Extracts conveyor schema fields
    let compatibleFields: ModelField[] = [];
    R.forEach((fieldName) => {
      // Gets rid of incompatible fields
      switch (fieldName) {
        case 'id':
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
          type = 'string';
          break;
        default:
          if (R.includes(currentField.fieldName, relationalFieldTypes)) {
            type = {
              name: currentField.fieldName,
            };
          }
      }
      if (type) {
        const field = {
          title: String(fieldName),
          type,
          required: aiSchema[modelTitle].fields[fieldName].required,
        };
        compatibleFields = R.append(field, compatibleFields);
      }
    }, fieldNames);
    return {
      title: String(modelTitle),
      title_plural: `${String(modelTitle)}s`,
      name: aiSchema[modelTitle].queryName,
      fields: compatibleFields,
    };
  }, modelTitles);
  return { models: conveyorSchema };
}

export default autoInventAdapter;
