import { memo, FC } from 'react'
import { Controller } from 'react-hook-form'

import FlexibleInput from '../commons/FlexibleInput'
import { ErrorMessage } from '../../enums'
import useInputProps from '../../hooks/useInputProps'
import { BaseProps, FieldData } from '../../types'
import { humanizeText } from '../../utils/common'

interface ModelFormProps extends BaseProps {
  field: string
  fieldData?: FieldData
}

const ModelFormInput = ({
  id,
  className,
  field,
  fieldData,
}: ModelFormProps) => {
  const inputProps = useInputProps({ fieldData })
  inputProps.className = className ?? inputProps.className
  return (
    <Controller
      name={field}
      rules={{
        required: fieldData?.required
          ? `${humanizeText(field)} ${ErrorMessage.REQUIRED_FIELD}`
          : false,
      }}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const props = {
          id,
          ...inputProps,
          ...field,
        }

        return (
          <FlexibleInput key="flex-input" inputProps={props} errors={error} />
        )
      }}
    />
  )
}

export default memo(ModelFormInput) as FC<ModelFormProps>
