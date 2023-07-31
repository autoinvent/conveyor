import { FC, memo } from 'react'

import { BaseProps, FieldData } from '../../types'
import { humanizeText } from '../../utils/common'

import ModelCreateForm from './ModelCreateForm'
import ModelCreateCrud from './ModelCreateCrud'
import ModelCreateInputs from './ModelCreateInputs'

interface ModelCreateProps extends BaseProps {
  modelName: string
  fields: string[]
  title?: string
  fieldsData?: Record<string, FieldData>
}

const ModelCreate: FC<ModelCreateProps> = ({
  id,
  className,
  modelName,
  fields,
  title = `Create ${humanizeText(modelName)}`,
  fieldsData,
  children,
}) => {
  return (
    <div id={id} className={className}>
      {children ?? (
        <>
          <div className="mb-4">
            <h1>{title}</h1>
            <div>* Indicates a required field</div>
          </div>
          <ModelCreateForm fields={fields}>
            <ModelCreateInputs fields={fields} fieldsData={fieldsData} />
            <ModelCreateCrud modelName={modelName} fieldsData={fieldsData} />
          </ModelCreateForm>
        </>
      )}
    </div>
  )
}

export default memo(ModelCreate) as FC<ModelCreateProps>
