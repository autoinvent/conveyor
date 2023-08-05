export interface BaseProps {
  id?: string
  className?: string
}

export interface ReducerAction {
  type: string
  payload: any
}

export interface Model {
  [fieldName: string]: Field
}

export interface Field {
  required?: boolean
  related?: RelatedField
}

export interface FieldData extends Field {
  displayLabelFn?: (field?: any) => any
  displayValueFn?: (data?: any) => any
}

export interface RelatedField {
  modelName: string
  many: boolean
  fields?: string[]
  fieldsData?: Record<string, FieldData>
}

