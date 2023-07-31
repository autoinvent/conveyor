import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

import ErrorList from './ErrorList'

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'checkbox',
  CREATABLE_SELECT = 'creatable_select',
  SELECT = 'select',
}
export interface FlexibleInputProps {
  inputProps?: Record<string, any>
  errors?: string | string[]
}

const FlexibleInput = ({ inputProps = {}, errors }: FlexibleInputProps) => {
  let inputTag
  switch (inputProps?.type) {
    case InputTypes.CREATABLE_SELECT:
      inputTag = <CreatableSelect {...inputProps} />
      break
    case InputTypes.SELECT:
      inputTag = <Select {...inputProps} />
      break
    default:
      inputTag = <input {...inputProps} />
  }

  return (
    <>
      {inputTag}
      <ErrorList errors={errors} />
    </>
  )
}

export default FlexibleInput
