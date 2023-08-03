import { useContext } from 'react'

import { ConveyorContext } from '../../contexts/ConveyorContext'
import {
  DisplayModeContext,
  DisplayMode,
} from '../../contexts/commons/DisplayModeContext'
import ModelFormInput from './ModelFormInput'
import { BaseProps, FieldData } from '../../types'

interface ModelFormFieldProps extends BaseProps {
  modelName: string
  field: string
  data: Record<string, any>
  fieldData?: FieldData
}

const ModelFormField = ({
  id,
  className,
  modelName,
  field,
  data,
  fieldData,
}: ModelFormFieldProps) => {
  const { mode } = useContext(DisplayModeContext)
  const { navigate } = useContext(ConveyorContext)

  const currData = data?.[field]
  const related = fieldData?.related
  const relatedDisplayField = related?.fields?.includes('name') ? 'name' : 'id'
  let displayData = currData
  if (related) {
    if (!related.many) {
      displayData = [displayData]
    }
    displayData = displayData?.map(
      (val: Record<string, any>, index: number) => (
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            navigate({ modelName: related?.modelName, id: val?.id })
          }}
          key={index}
        >
          {val?.[relatedDisplayField]}
          {index !== displayData?.length - 1 && ','}
        </a>
      )
    )
  } else if (field === 'name') {
    displayData = (
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault()
          navigate({ modelName, id: data?.id })
        }}
      >
        {currData}
      </a>
    )
  }

  return (
    <div id={id} className={className}>
      {fieldData?.displayValueFn?.(currData) ?? mode === DisplayMode.DISPLAY ? (
        <span>{displayData}</span>
      ) : (
        <ModelFormInput field={field} fieldData={fieldData} />
      )}
    </div>
  )
}

export default ModelFormField
