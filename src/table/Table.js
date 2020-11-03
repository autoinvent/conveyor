import React from 'react'
import Field from './Field'
import { THead } from './Header'
import { TFoot } from './Footer'
import {
  skipOverride,
} from '../Utils'
import * as R from 'ramda'
import DetailLink from '../DetailLink'
import { Link } from 'react-router-dom'
import { DeleteDetail, RemoveDetail } from '../delete/DeleteDetail'
import {
  RowEditButton,
  EditSaveButton,
  EditCancelButton,
  EditInput,
  isEditing,
  getFieldEditData,
  getFieldErrorEdit
} from '../Edit'
import { IndexPagination, DetailPagination } from '../Pagination'

export const DetailViewButton = ({ modelName, id }) => (
  <Link to={`/${modelName}/${id}`} className="btn btn-sm btn-outline-primary">
    View
  </Link>
)

export const DeleteButton = ({ modalId, onDeleteWarning, modelName, id }) => {
  return (
    <button
      className="btn btn-sm btn-outline-danger"
      data-toggle="modal"
      data-target={'#' + modalId}
      onClick={() => onDeleteWarning({ modelName, id })}
    >
      Delete
    </button>
  )
}

export const RemoveButton = ({ modalId }) => {
  return (
    <button
      className="btn btn-sm btn-outline-warning"
      data-toggle="modal"
      data-target={'#' + modalId}
    >
      Remove
    </button>
  )
}

export const showButtonColumn = ({ deletable, editable, detailField }) => {
  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField)
}

export const TableButtonGroup = ({
  schema,
  modelName,
  node,
  detailField,
  editable,
  parentId,
  idx,
  modalData,
  parentModelName,
  parentFieldName,
  deletable,
  onDelete,
  fromIndex,
  customProps
}) => {
  const parentFieldType = schema.getType(parentModelName, parentFieldName)
  const m2m = parentFieldType === 'ManyToMany'
  const actions = schema.getActions(modelName)
  const onRemove = R.path(['edit', 'onDetailTableRemoveSubmit'], actions)
  const modalId = `confirm-${m2m ? 'remove' : 'delete'}-${modelName}-${parentFieldName}-${idx}`
  const id = node.id
  const canRemove = !fromIndex && m2m && editable
  return (
    <React.Fragment>
      <div className="btn-group">
        {// If detailField is null then use the detailButton
          R.isNil(detailField) && <DetailViewButton {...{ modelName, id: node.id }} />}
        {editable && (
          <RowEditButton
            {...{
              schema,
              modelName,
              id: node.id,
              node
            }}
          />
        )}
        {canRemove && (
          <RemoveButton
            {...{
              modalId,
              modelName,
              id
            }}
          />
        )}
        {deletable && !canRemove && (
          <DeleteButton
            {...{
              modalId,
              onDeleteWarning: R.path(['delete', 'onDeleteWarning'], actions),
              modelName,
              id
            }}
          />
        )}
      </div>
      {canRemove && (
        <RemoveDetail
          {...{
            schema,
            id,
            modalId,
            modelName,
            onRemove,
            parentId,
            parentModelName,
            parentFieldName,
            node,
            customProps
          }}
        />
      )}
      {deletable && !canRemove && (
        <DeleteDetail
          {...{
            schema,
            id,
            modalId,
            modelName,
            onDelete,
            parentId,
            parentModelName,
            modalData,
            customProps
          }}
        />
      )}
    </React.Fragment>
  )
}

export const TableRowWithEdit = ({
  modelName,
  fieldName,
  node,
  schema,
  detailField,
  editData,
  tooltipData,
  selectOptions,
  parentNode,
  customProps
}) => {
  if (
    isEditing(editData, modelName, node.id) &&
    schema.isFieldEditable({
      modelName,
      fieldName,
      node,
      parentNode,
      customProps
    })
  ) {
    const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
    const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)
    return (
      <EditInput
        {...{
          schema,
          modelName,
          fieldName,
          node,
          editData: fieldEditData,
          error,
          selectOptions,
          customProps
        }}
      />
    )
  }
  const Override = schema.getCellOverride(modelName, fieldName)
  if (skipOverride(Override)) {
    return null
  }
  if (Override) {
    return (
      <Override
        {...{
          schema,
          modelName,
          fieldName,
          node,
          tooltipData,
          id: node.id,
          customProps
        }}
      />
    )
  }
  // Add DetailLink to the field that is marked as the displayField
  if (detailField === fieldName) {
    const displayString = schema.getDisplayValue({ modelName, node, customProps })
    return <DetailLink {...{ modelName, id: node.id }}>{displayString}</DetailLink>
  }
  return (
    <Field
      {...{
        schema,
        modelName,
        fieldName,
        node,
        tooltipData,
        id: node.id,
        customProps
      }}
    />
  )
}

export const TableButtonCell = ({
  modelName,
  parentModelName,
  node,
  schema,
  detailField,
  editData,
  onEditSubmit,
  onEditCancel,
  deletable,
  editable,
  parentId,
  modalData,
  parentFieldName,
  onDelete,
  idx,
  fromIndex,
  customProps
}) => {
  return isEditing(editData, modelName, node.id) ? (
    <div className="table-btn-group">
      <div className="btn-group">
        <EditSaveButton
          {...{
            onClick: evt => onEditSubmit({ modelName, id: node.id })
          }}
        />
        <EditCancelButton
          {...{
            onClick: evt => onEditCancel({ modelName, id: node.id })
          }}
        />
      </div>
    </div>
  ) : (
    <TableButtonGroup
      {...{
        schema,
        modelName,
        node,
        detailField,
        deletable,
        editable,
        parentId,
        idx,
        modalData,
        parentModelName,
        parentFieldName,
        onDelete,
        fromIndex,
        customProps
      }}
    />
  )
}

const TBody = ({
  schema,
  modelName,
  data, // ordered list
  fieldOrder,
  onDelete,
  onEditSubmit,
  parentId,
  parentModelName,
  parentFieldName,
  detailField,
  tooltipData,
  modalData,
  editData,
  tableEditable,
  deletable,
  selectOptions,
  parentNode,
  fromIndex,
  customProps
}) => {
  const actions = schema.getActions(modelName)
  const onEditCancel = R.path(['edit', 'onTableEditCancel'], actions)
  return (
    <tbody>
      {data.map((node, idx) => {
        const editable = schema.isRowEditable({
          modelName,
          node,
          parentNode,
          fieldOrder,
          customProps
        })
        return (
          <tr key={`table-tr-${node.id}`}>
            {fieldOrder.map((fieldName, headerIdx) => {
              if (fromIndex === true) {
                if (
                  schema.shouldDisplayIndex({
                    modelName,
                    fieldName,
                    customProps
                  }) === false
                ) {
                  return null
                }
              }

              return (
                <td key={`${node.id}-${headerIdx}`}>
                  <TableRowWithEdit
                    key={`table-td-${node.id}-${headerIdx}`}
                    {...{
                      modelName,
                      fieldName,
                      node,
                      schema,
                      detailField,
                      editData,
                      tooltipData,
                      selectOptions,
                      parentNode,
                      customProps
                    }}
                  />
                </td>
              )
            })}
            {showButtonColumn({
              deletable,
              editable: tableEditable,
              detailField
            }) && (
              <td key={`${node.id}-edit-delete`}>
                {
                  <TableButtonCell
                    {...{
                      modelName,
                      parentModelName,
                      node,
                      schema,
                      detailField,
                      editData,
                      onEditSubmit,
                      onEditCancel,
                      deletable,
                      editable,
                      parentId,
                      modalData,
                      parentFieldName,
                      onDelete,
                      idx,
                      fromIndex,
                      customProps
                    }}
                  />
                }
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */
export const Table = ({
  schema,
  modelName,
  node: parentNode,
  data, // ordered list
  fieldOrder,
  onDelete,
  onEditSubmit,
  modalData,
  editData,
  selectOptions,
  parentId,
  parentModelName,
  parentFieldName,
  tooltipData,
  tableView,
  Head = THead,
  Body = TBody,
  Foot = TFoot,
  collapse,
  fromIndex,
  customProps,
  summary
}) => {
  const paginateIndex = R.propOr(true, 'paginate', schema.getModel(modelName))
  const paginateDetail = R.pathOr(true, ['fields', parentFieldName, 'paginate'], schema.getModel(parentModelName))

  if (!fromIndex && collapse) {
    return null
  }

  if (!data) {
    return <div>...Loading</div>
  }
  if (!fromIndex && data.length === 0) {
    const noDataDisplayValue = schema.getNoDataDisplayValue({ modelName: parentModelName, fieldName: parentFieldName, node: parentNode, customProps })
    return <div style={{ paddingBottom: '10px' }}>{noDataDisplayValue}</div>
  }

  const deletable = schema.isTableDeletable({
    modelName,
    data,
    parentNode,
    customProps
  })
  const detailField = schema.getTableLinkField(modelName, fieldOrder)
  const editable = schema.isTableEditable({
    modelName,
    data,
    parentNode,
    fieldOrder,
    customProps
  })

  return (
    <React.Fragment>
      <table className="table table-striped table-bordered table-hover">
        <Head
          {...{
            schema,
            modelName,
            fieldOrder,
            data,
            deletable,
            editable,
            detailField,
            selectOptions,
            tableView,
            fromIndex,
            customProps
          }}
        />
        <Body
          {...{
            schema,
            modelName,
            data,
            onDelete,
            onEditSubmit,
            fieldOrder,
            detailField,
            tooltipData,
            parentId,
            parentModelName,
            parentFieldName,
            modalData,
            selectOptions,
            editData,
            deletable,
            tableEditable: editable,
            parentNode,
            fromIndex,
            customProps
          }}
        />
        <Foot
          {...{
            schema,
            modelName,
            parentModelName,
            parentFieldName,
            fieldOrder,
            summary,
            fromIndex,
            customProps,
          }}
        />
      </table>
      {paginateIndex && fromIndex ? (
        <IndexPagination
          {...{
            schema,
            modelName,
            tableView
          }}
        />
      ) : paginateDetail && (
        <DetailPagination
          {...{
            schema,
            modelName: parentModelName,
            fieldName: parentFieldName,
            tableView
          }}
        />
      )}
    </React.Fragment>
  )
}
