import React from 'react'
import * as R from 'ramda'
import { Modal } from '../Modal'

const exclusionCondition = key => !R.includes(key, ['__typename', 'id'])

const getHeaders = (schema, modelName, node) =>
  R.pipe(
    R.pickBy((_, key) => exclusionCondition(key)),
    R.keys()
  )(node)


const getRowFields = (schema, modelName, node, nodeOrder) => {
  const fieldDefinitions = schema.getFields(modelName)
  if (!nodeOrder) {
    nodeOrder = Object.keys(node)
  }
  // 'key' is fieldName, id, or __typename
  const fields = nodeOrder.map((key) => {
    const value = R.prop(key, node)
    const override = R.path([modelName, 'deleteModal', 'rows', key], schema.schemaJSON)
    if (override) {
      return override({ schema, modelName, node, fieldName: key })
    }
    if (value === Object(value)) {
      const targetModel = R.path([key, 'type', 'target'], fieldDefinitions)
      return getRowFields(schema, targetModel, value)
    }

    if (exclusionCondition(key)) {
      if (schema.isEnum(modelName, key)) {
        const label = schema.getEnumLabel(modelName, key, value)
        return label === undefined ? '' : label
      } else {
        return value
      }
    }
  })

  return R.pipe(
    R.flatten,
    R.reject(val => val === undefined)
  )(fields)
}

const Row = ({ schema, nodeModelName, node, editedHeaderFields }) => {
  const fields = getRowFields(schema, nodeModelName, node, editedHeaderFields)
  return (
    <tr>
      {fields.map((field, index) => (
        <td key={index}>
          {field}
        </td>
      ))}
    </tr>
  )
}

const HeaderRow = ({ headers }) => {
  return (
    <tr>
      {headers.map((head, index) => (
        <th key={index}>
          {head}
        </th>
      ))}
    </tr>
  )
}


const ReviewTable = ({ schema, table, customProps }) => {
  let headers = []
  let editedHeaderFields
  if (!R.isEmpty(table)) {
    const node = table[0]
    const nodeModelName = R.prop('__typename', node)
    // get headers from schema
    const customHeaders = R.path([nodeModelName, 'deleteModal', 'headers'], schema.schemaJSON)

    if (!customHeaders) {
      // pick fields that 'node' contains & order them by 'fieldOrder'
      const headerFields = getHeaders(schema, nodeModelName, node)
      const fieldOrder = R.propOr([], 'fieldOrder', schema.getModel(nodeModelName))

      editedHeaderFields = R.filter(
        R.identity,
        fieldOrder.map(field => R.includes(field, headerFields) ? field : undefined)
      )
    } else {
      editedHeaderFields = customHeaders
    }

    // turn fieldNames in to labels
    headers = editedHeaderFields.map(fieldName =>
      schema.getFieldLabel({ modelName: nodeModelName, fieldName, data: table, customProps })
    )
  }
  const tableDisplayName = schema.getModelLabel({
    modelName: R.propOr('', '__typename', R.head(table)), data: table, customProps
  })
  return (
    <div className='mt-2'>
      <h5 className='d-inline'>{tableDisplayName}</h5>
      <table className='table table-striped table-bordered'>
        <tbody>
          <HeaderRow {...{
            headers
          }} />
          {table && table.map((node, index) => (
            <Row key={`${index}-${node.id}`} {...{
              schema,
              nodeModelName: R.prop('__typename', node),
              node,
              editedHeaderFields
            }} />
          ))}
        </tbody>
      </table>
    </div>
  )
}


export const DeleteDetail = ({
  schema,
  modelName,
  id,
  modalId,
  title = 'Confirm Delete',
  onDelete,
  modalData,
  parentModelName,
  parentId,
  customProps
}) => {
  const modalStore = R.prop('Delete', modalData)
  const actions = schema.getActions(modelName)
  const onCancelDelete = R.path(['delete', 'onCancelDelete'], actions)
  return (
    <Modal {...{ id: modalId, title }}>
      <span><strong>The following entries will be deleted:</strong></span>
      {!modalStore && <div className={'text-center'}>...loading</div>}
      {modalStore && modalStore.map((table, index) => (
        <ReviewTable key={`${index}-${R.propOr('', '__typename', R.head(table))}`}
          {...{ schema, table, customProps }}
        />
      ))}
      <div className='modal-footer justify-content-center mt-3'>
        <div className='btn-group'>
          <button
            className='btn btn-small btn-outline-secondary '
            data-dismiss='modal'
            onClick={() => onCancelDelete()}
          >Cancel</button>
          <button
            className='btn btn-small btn-outline-danger '
            data-dismiss='modal'
            onClick={() => onDelete({
              id: id,
              parentModel: parentModelName,
              parentId,
              modelName
            })}
          >Confirm Delete</button>
        </div>
      </div>
    </Modal>
  )
}

export const RemoveDetail = ({
  schema,
  id,
  modalId,
  title = 'Confirm Removal',
  onRemove,
  modelName,
  parentModelName,
  parentFieldName,
  parentId,
  node,
  customProps
}) => {
  const name = schema.getDisplayValue({ modelName, node, customProps })
  const parentField = schema.getFieldLabel({ modelName: parentModelName, fieldName: parentFieldName, node, customProps })
  return (
    <Modal {...{ id: modalId, title }}>
      <span>
        <strong>{`Do you want to remove ${name} from ${parentField}?`}</strong>
        {` Note: ${name} will not be deleted, but the relationship will be cut.`}
      </span>
      <div className='modal-footer justify-content-center mt-3'>
        <div className='btn-group'>
          <button
            className='btn btn-small btn-outline-secondary '
            data-dismiss='modal'
          >Cancel</button>
          <button
            className='btn btn-small btn-outline-danger '
            data-dismiss='modal'
            onClick={() => onRemove({
              modelName: parentModelName,
              fieldName: parentFieldName,
              id: parentId,
              removedId: id,
            })}
          >Confirm Removal</button>
        </div>
      </div>
    </Modal>
  )
}
