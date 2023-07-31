import { useContext, FC, memo } from 'react'

import { ConveyorContext } from '../../contexts/ConveyorContext'
import { LoadingContext } from '../../contexts/commons/LoadingContext'
import { useGQLMutation, GQLMutationAction } from '../../hooks/useGQLMutation'
import { BaseProps, FieldData } from '../../types'
import { generateGQLAction, generateGQLDocument } from '../../utils/gqlRequest'
import ModelFormCrud from '../form/ModelFormCrud'

interface ModelDetailCrudProps extends BaseProps {
  modelName: string
  data: Record<string, any>
  fieldsData?: Record<string, FieldData>
  editable?: boolean
  deletable?: boolean
}

const ModelDetailCrud = ({
  id,
  className,
  modelName,
  data,
  fieldsData,
  editable = true,
  deletable = true,
}: ModelDetailCrudProps) => {
  const { setLoading } = useContext(LoadingContext)
  const { navigate } = useContext(ConveyorContext)

  const updateAction = generateGQLAction(
    GQLMutationAction.MODEL_UPDATE,
    modelName
  )
  const deleteAction = generateGQLAction(
    GQLMutationAction.MODEL_DELETE,
    modelName
  )
  const updateDocument = generateGQLDocument(
    GQLMutationAction.MODEL_UPDATE,
    modelName,
    ['id']
  )
  const deleteDocument = generateGQLDocument(
    GQLMutationAction.MODEL_DELETE,
    modelName,
    ['id']
  )
  const updateTrigger = useGQLMutation({
    modelName,
    action: updateAction,
    document: updateDocument,
  })
  const deleteTrigger = useGQLMutation({
    modelName,
    action: deleteAction,
    document: deleteDocument,
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
    const variables = { id: data.id, input }
    setLoading(true)
    updateTrigger({ variables }).finally(() => setLoading(false))
  }
  const onDelete = () => {
    const variables = { id: data.id }
    setLoading(true)
    deleteTrigger({ variables })
      .then(() => navigate({ modelName }))
      .catch(() => setLoading(false))
  }
  return (
    <ModelFormCrud
      id={id}
      className={className}
      onSave={onSave}
      onDelete={onDelete}
      editable={editable}
      deletable={deletable}
    />
  )
}

export default memo(ModelDetailCrud) as FC<ModelDetailCrudProps>
