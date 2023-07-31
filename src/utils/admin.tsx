import { Model, Field, FieldData } from '../types'

interface IntrospectionTypeInputField {
  name: string
  defaultValue?: string
  type?: IntrospectionType
}
interface IntrospectionTypeField {
  name: string
  type?: IntrospectionType
}
interface IntrospectionType {
  name: string
  kind?: string
  inputFields?: IntrospectionTypeInputField[]
  fields?: IntrospectionTypeField[]
  ofType?: { name: string; kind: string }
}
interface Introspection {
  __schema: {
    types: IntrospectionType[]
  }
}

export const extractModelsFromIntrospection = (
  introspection: Introspection
) => {
  const models: Record<string, Model> = {}
  // Extract model names and required fields
  introspection.__schema.types.forEach((type: IntrospectionType) => {
    const typeName = type?.name
    if (typeName?.endsWith('InputRequired')) {
      const modelName = typeName.replace('InputRequired', '')
      const fields = {} as Record<string, Field>
      // Get required property for each field
      type.inputFields?.forEach((field) => {
        const required =
          field.defaultValue === null && field.type?.kind === 'NON_NULL'
        fields[field.name] = { required }
      })
      models[modelName] = fields
    }
  })

  // Get related property for each field
  introspection.__schema.types.forEach((type: IntrospectionType) => {
    const typeName = type?.name
    if (models?.[typeName]) {
      type.fields?.forEach((field) => {
        const fieldKind = field.type?.kind
        const fieldName = field.name
        const fields: string[] = []
        switch (fieldKind) {
          case 'OBJECT': {
            const modelName = field.type?.name ?? ''
            models[typeName][fieldName].related = {
              modelName,
              many: false,
              fields,
            }
            break
          }
          case 'LIST': {
            if (field.type?.ofType?.kind === 'OBJECT') {
              const modelName = field.type?.ofType?.name
              models[typeName][fieldName].related = {
                modelName,
                many: true,
                fields,
              }
            }
            break
          }
          default: {
            if (!models[typeName][fieldName] && fieldName !== 'id') {
              models[typeName][fieldName] = { required: false }
            }
          }
        }
      })
    }
  })

  // Get related.fields property for each field
  Object.keys(models).forEach((modelName) => {
    Object.keys(models[modelName]).forEach((fieldName) => {
      const related = models[modelName][fieldName].related
      if (related) {
        models[modelName][fieldName].related = {
          ...related,
          fields: Object.keys(models[related.modelName]),
        }
      }
    })
  })

  // Get related.fieldsData property for each field
  Object.keys(models).forEach((modelName) => {
    Object.keys(models[modelName]).forEach((fieldName) => {
      const related = models[modelName][fieldName].related
      if (related) {
        const fieldsData = {} as Record<string, FieldData>
        const fieldModel = models[related.modelName]
        related.fields.forEach((subFieldName) => {
          if (fieldModel[subFieldName].related) {
            const subModelName =
              fieldModel[subFieldName].related?.modelName ?? ''
            const subFields = models[subModelName]['name'] ? ['name'] : []
            fieldsData[subFieldName] = {
              related: {
                modelName: subModelName,
                many: fieldModel[subFieldName].related?.many ?? false,
                fields: subFields,
              },
            }
          }
        })
        models[modelName][fieldName].related = {
          ...related,
          fieldsData,
        }
      }
    })
  })

  return models
}
