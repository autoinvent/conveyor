import { Model } from "../types";
import { getFieldKeys } from "../utils/common"


interface IntrospectionType {
  name: string;
  kind?: string;
  fields?: IntrospectionTypeField[];
  ofType?: { name: string; kind: string };
}
interface IntrospectionTypeField {
  name: string;
  type?: IntrospectionType;
}
interface Introspection {
  __type: {
    name: 'Query'
    fields: IntrospectionTypeField[];
  };
}


const extractInnerMostOfType: any = (modelFieldType: IntrospectionType) => {
  if (!modelFieldType.ofType) return modelFieldType
  const ofType = { ...modelFieldType.ofType }
  if (modelFieldType.kind === 'OBJECT' || modelFieldType.kind === 'LIST') {
    ofType.kind = modelFieldType.kind
  }
  return extractInnerMostOfType(ofType)
}

export const extractModelsFromIntrospection = (
  introspection: Introspection,
  keyFallbacks: string[]
) => {
  const models: Record<string, Model> = {};
  // Extract models
  introspection.__type.fields.forEach((queryField: IntrospectionTypeField) => {
    const queryName = queryField?.name;
    if (queryName.endsWith('_item') && queryField?.type) {
      const modelName = queryField.type.name
      models[modelName] = {}
      queryField.type?.fields?.forEach?.((modelField) => {
        const required = Boolean(modelField.type?.kind === 'NON_NULL')
        const ofType = extractInnerMostOfType(modelField.type)
        models[modelName][modelField.name] = { required }
        if (ofType.kind === 'LIST' || ofType.kind === 'OBJECT') {
          models[modelName][modelField.name].related = {
            modelName: ofType.name, many: ofType.kind === 'LIST'
          }
        }
      })
    }
  });

  // Extract each model's related fields
  Object.keys(models).forEach((modelName) => {
    Object.keys(models[modelName]).forEach((fieldName) => {
      const related = models[modelName][fieldName].related
      if (related) {
        related.fields = Object.keys(models[related.modelName])
      }
    })
  });

  // Extract each model's related fieldsData
  Object.keys(models).forEach((modelName) => {
    Object.keys(models[modelName]).forEach((fieldName) => {
      const related = models[modelName][fieldName].related
      if (related) {
        related.fields?.forEach((fieldName2) => {
          const { related: related2, required: required2 } = models[related.modelName][fieldName2]
          if (related2) {
            if (!related.fieldsData) related.fieldsData = {}
            related.fieldsData[fieldName2] = {
              required: required2,
              related: {
                modelName: related2.modelName,
                many: related2.many,
                fields: getFieldKeys(related2.fields ?? [], keyFallbacks)
              }
            }
          }
        })
      }
    })
  });

  return models;
};
