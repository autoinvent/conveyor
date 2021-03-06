import React from 'react'
import Field from './Field'
import { THead } from './Header'
import { TFoot } from './Footer'
import { skipOverride } from '../Utils'
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

export const DetailViewButton = ({
  modelName,
  id
}: {
  modelName: string
  id: string
}) => (
  <Link to={`/${modelName}/${id}`} className="conv-btn-outline-primary">
    View
  </Link>
)

/**
 * React Component for Delete Button
 * @param modalId id of delete modal shown
 * @param onDeleteWarning function to warn that a delete is imminent, called on click
 * @param modelName name of the model
 * @param id id of the object to be deleted
 * @return Rendered React Component
 */
type DeleteButtonProps = {
  modalId: string
  onDeleteWarning: any
  modelName: string
  id: string
}
export const DeleteButton = ({
  modalId,
  onDeleteWarning,
  modelName,
  id
}: DeleteButtonProps) => {
  return (
    <button
      className="conv-btn-outline-danger"
      data-toggle="modal"
      data-target={'#' + modalId}
      onClick={() => onDeleteWarning({ modelName, id })}
    >
      Delete
    </button>
  )
}

export const RemoveButton = ({ modalId }: { modalId: string }) => {
  return (
    <button
      className="conv-btn-outline-warning"
      data-toggle="modal"
      data-target={'#' + modalId}
    >
      Remove
    </button>
  )
}

type showButtonColumnProps = {
  deletable: boolean
  editable: boolean
  detailField: any
}
export const showButtonColumn = ({
  deletable,
  editable,
  detailField
}: showButtonColumnProps) => {
  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField)
}

type TableButtonGroupProps = {
  schema: any
  modelName: string
  node: any
  detailField: any
  editable: boolean
  parentId: string
  idx: number
  modalData: any
  parentModelName: string
  parentFieldName: string
  deletable: boolean
  onDelete: any
  fromIndex: any
  customProps: any
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
}: TableButtonGroupProps) => {
  const parentFieldType = schema.getType(parentModelName, parentFieldName)
  const m2m = parentFieldType === 'ManyToMany'
  const actions = schema.getActions(modelName)
  const onRemove = R.path(['edit', 'onDetailTableRemoveSubmit'], actions)
  const modalId = `confirm-${
    m2m ? 'remove' : 'delete'
  }-${modelName}-${parentFieldName}-${idx}`
  const id = node.id
  const canRemove = !fromIndex && m2m && editable
  return (
    <React.Fragment>
      <div className="conv-btn-group">
        {
          // If detailField is null then use the detailButton
          R.isNil(detailField) && (
            <DetailViewButton {...{ modelName, id: node.id }} />
          )
        }
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

/**
 * React Component wrapping a table field/cell
 * @param schema model schema
 * @param modelName the name of the model
 * @param fieldName name of the field
 * @param node data of the object associated with the row
 * @param detailField name of the field that containing the name of the object
 * > also links to that object
 * @param editData information on what is being edited, current state and any errors
 * @param tooltipData displayed tooltip data for objects referenced by the table.
 * @param selectOptions options used by the select input type
 * @param parentNode object data of the parent object, if being shown from Detail page
 * @param customProps user defined props and customization
 * @return Rendered React Component
 */
type TableRowWithEditProps = {
  modelName: string
  fieldName: string
  node: any
  schema: any
  detailField: any
  editData: any
  tooltipData: any
  selectOptions: any
  parentNode: any
  customProps: any
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
}: TableRowWithEditProps) => {
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
    const fieldEditData = getFieldEditData(
      editData,
      modelName,
      fieldName,
      node.id
    )
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
    const displayString = schema.getDisplayValue({
      modelName,
      node,
      customProps
    })
    return (
      <DetailLink {...{ modelName, id: node.id }}>{displayString}</DetailLink>
    )
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

/**
 * React Component for the Table Cell with buttons, on right hand side
 * @param modelName the name of the model
 * @param parentModelName name of parent model, if being shown from Detail page
 * @param node data of the object associated with the row
 * @param schema model schema
 * @param detailField name of the field that containing the name of the object
 * > also links to that object
 * @param editData information on what is being edited, current state and any errors
 * @param onEditSubmit function called when a row is edited
 * @param onEditCancel function called when a row edit is canceled
 * @param deletable boolean may delete this object
 * @param editable boolean may edit this object
 * @param parentId id of parent, if being shown from Detail page
 * @param modalData delete detail modal information
 * @param parentFieldName name of parent field, if being shown from Detail page
 * @param onDelete function called when a row is deleted
 * @param idx index of the row
 * @param fromIndex boolean, whether or not the table is an Index table
 * @param customProps user defined props and customization
 * @return Rendered React Component
 */
type TableButtonCellProps = {
  modelName: string
  parentModelName: string
  node: any
  schema: any
  detailField: any
  editData: any
  onEditSubmit: any
  onEditCancel: any
  deletable: boolean
  editable: boolean
  parentId: string
  modalData: any
  parentFieldName: string
  onDelete: any
  idx: number
  fromIndex: any
  customProps: any
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
}: TableButtonCellProps) => {
  return isEditing(editData, modelName, node.id) ? (
    <div className="table-btn-group">
      <div className="conv-btn-group">
        <EditSaveButton
          {...{
            onClick: () => onEditSubmit({ modelName, id: node.id })
          }}
        />
        <EditCancelButton
          {...{
            onClick: () => onEditCancel({ modelName, id: node.id })
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

type TDListProps = {
  schema: any
  modelName: string
  fieldOrder: any
  detailField: any
  tooltipData: any
  editData: any
  selectOptions: any
  parentNode: any
  node: any
  fromIndex: any
  customProps: any
}
const TDList = ({
  schema,
  modelName,
  fieldOrder,
  detailField,
  tooltipData,
  editData,
  selectOptions,
  parentNode,
  node,
  fromIndex,
  customProps
}: TDListProps) => {
  return fieldOrder.map((fieldName: string, headerIdx: number) => {
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
  })
}

type TRListProps = {
  schema: any
  modelName: string
  data: any
  fieldOrder: any
  onDelete: any
  onEditSubmit: any
  parentId: string
  parentModelName: string
  parentFieldName: string
  detailField: any
  tooltipData: any
  modalData: any
  editData: any
  tableEditable: boolean
  deletable: boolean
  selectOptions: any
  parentNode: any
  fromIndex: any
  customProps: any
  onEditCancel: any
  buttonColumnExists: boolean
}
const TRList = ({
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
  customProps,
  onEditCancel,
  buttonColumnExists
}: TRListProps) => {
  return data.map((node: any, idx: number) => {
    const editable = schema.isRowEditable({
      modelName,
      node,
      parentNode,
      fieldOrder,
      customProps
    })
    return (
      <tr key={`table-tr-${node.id}`}>
        <TDList
          {...{
            schema,
            modelName,
            fieldOrder,
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
            node,
            fromIndex,
            customProps
          }}
        />
        {buttonColumnExists && (
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
  })
}
type TBodyProps = {
  schema: any
  modelName: string
  data: any
  fieldOrder: any
  onDelete: any
  onEditSubmit: any
  parentId: string
  parentModelName: string
  parentFieldName: string
  detailField: any
  tooltipData: any
  modalData: any
  editData: any
  tableEditable: any
  deletable: boolean
  selectOptions: any
  parentNode: any
  fromIndex: any
  customProps: any
  buttonColumnExists: boolean
}
export const TBody = ({
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
  customProps,
  buttonColumnExists
}: TBodyProps) => {
  const actions = schema.getActions(modelName)
  const onEditCancel = R.path(['edit', 'onTableEditCancel'], actions)
  return (
    <tbody>
      <TRList
        {...{
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
          customProps,
          onEditCancel,
          buttonColumnExists
        }}
      />
    </tbody>
  )
}

/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */
/**
 * Overridable React Component for Tables
 * @param schema model schema
 * @param modelName the name of the model
 * @param node object data of the parent object, if being shown from Detail page
 * @param data data in the table
 * @param fieldOrder all fields in column order
 * @param onDelete function called when a row is deleted
 * @param onEditSubmit function called when a row is edited
 * @param modalData delete detail modal information
 * @param editData information on what is being edited, current state and any errors
 * @param selectOptions options used by the select input type
 * @param parentId id of parent, if being shown from Detail page
 * @param parentModelName name of parent model, if being shown from Detail page
 * @param parentFieldName name of parent field, if being shown from Detail page
 * @param tooltipData displayed tooltip data for objects referenced by the table.
 * @param tableView has sort and pagination information, as well as filtering info
 * @param Head override table header
 * @param Body override table body
 * @param Foot override table footer
 * @param collapse boolean, whether or not the table is collapsed
 * @param fromIndex boolean, whether or not the table is an Index table
 * @param customProps user defined props and customization
 * @param summary summary information for the footer
 * > ex: sum of table column, optional if no footer
 * @return Rendered React Component
 */
type TableProps = {
  schema: any
  modelName: string
  node: any
  data: any
  fieldOrder: any
  onDelete: any
  onEditSubmit: any
  modalData: any
  editData: any
  selectOptions: any
  parentId: string
  parentModelName: string
  parentFieldName: string
  tooltipData: any
  tableView: any
  Head: any
  Body: any
  Foot: any
  collapse: any
  fromIndex: any
  customProps: any
  summary: any
}
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
}: TableProps) => {
  const paginateIndex = R.propOr(true, 'paginate', schema.getModel(modelName))
  const paginateDetail = R.pathOr(
    true,
    ['fields', parentFieldName, 'paginate'],
    schema.getModel(parentModelName)
  )

  if (!fromIndex && collapse) {
    return null
  }

  if (!data) {
    return <div>...Loading</div>
  }
  if (!fromIndex && data.length === 0) {
    const noDataDisplayValue = schema.getNoDataDisplayValue({
      modelName: parentModelName,
      fieldName: parentFieldName,
      node: parentNode,
      customProps
    })
    return <div className="no-data-display">{noDataDisplayValue}</div>
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
  const buttonColumnExists = showButtonColumn({
    deletable,
    editable,
    detailField
  })

  return (
    <React.Fragment>
      <table className={'conv-table conv-table-' + modelName}>
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
            customProps,
            buttonColumnExists
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
            buttonColumnExists
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
      ) : (
        paginateDetail && (
          <DetailPagination
            {...{
              schema,
              modelName: parentModelName,
              fieldName: parentFieldName,
              tableView
            }}
          />
        )
      )}
    </React.Fragment>
  )
}
