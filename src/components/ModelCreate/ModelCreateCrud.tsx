import { useContext } from 'react'

import { ConveyorContext } from '../../contexts/ConveyorContext'
import { LoadingContext } from '../../contexts/commons/LoadingContext'
import { useGQLMutation, GQLMutationAction } from '../../hooks/useGQLMutation'
import { BaseProps, FieldData } from '../../types'
import { generateGQLAction, generateGQLDocument } from '../../utils/gqlRequest'

import ModelFormCrud from '../form/ModelFormCrud'

interface ModelCreateCrudProps extends BaseProps {
  modelName: string
  fieldsData?: Record<string, FieldData>
}

const ModelCreateCrud = ({
  id,
  className,
  modelName,
  fieldsData,
}: ModelCreateCrudProps) => {
  const { setLoading } = useContext(LoadingContext)
  const { navigate } = useContext(ConveyorContext)

  const createAction = generateGQLAction(
    GQLMutationAction.MODEL_CREATE,
    modelName
  )

  const createDocument = generateGQLDocument(
    GQLMutationAction.MODEL_CREATE,
    modelName,
    ['id']
  )

  const createTrigger = useGQLMutation({
    modelName,
    action: createAction,
    document: createDocument,
  })

  const onSave = (formValues: Record<string, any>) => {
    const input = {} as Record<string, any>
    Object.keys(formValues).forEach((fieldName) => {
      input[fieldName] = formValues[fieldName]
      const related = fieldsData?.[fieldName]?.related
      if (related) {
        if (related?.many) {
          input[fieldName] = input[fieldName]
            ? input[fieldName].map((model: Record<string, any>) => model.id)
            : []
        } else {
          input[fieldName] = input[fieldName] ? input[fieldName].id : ''
        }
      }
    })
    const variables = { input }
    setLoading(true)
    createTrigger({ variables })
      .then(() => navigate({ modelName }))
      .catch(() => setLoading(false))
  }
  const onCancel = () => {
    navigate({ modelName })
  }
  return (
    <ModelFormCrud
      id={id}
      className={className}
      onSave={onSave}
      onCancel={onCancel}
      editable={true}
    />
  )
}

export default ModelCreateCrud
