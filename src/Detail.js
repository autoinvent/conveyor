import React from 'react'
import * as R from 'ramda'
import { DeleteButton, Table } from './table/Table'
import Field, { getRelSchemaEntry } from './table/Field'
import {
  skipOverride,
} from './Utils'
import { RecursiveTab } from './Tabs'
import CreateButton from './CreateButton'
import {
  EditSaveButton,
  EditCancelButton,
  isFieldEditing,
  getFieldEditData,
  InlineEditButton,
  FileDelete,
  TableEditButton,
  getFieldErrorEdit,
  EditInput
} from './Edit'
import { Popover, PopoverContent } from './Popover'
import Input from './form/Input'
import { Link, Redirect } from 'react-router-dom'
import '../css/index.css'
import { inputTypes } from './consts'
import { DeleteDetail } from './delete/DeleteDetail'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'

const LabelInfoPopover = ({ LabelInfoComponent, fieldLabel }) => (
  <Popover
    Content={
      <PopoverContent>
        <LabelInfoComponent />
      </PopoverContent>
    }
    labelValue={fieldLabel}
  />
)

export const CollapseTableButton = ({ modelName, fieldName, id, collapse, collapseTableChange }) => {
  const CollapseTableIcon = collapse ? FaAngleRight : FaAngleDown
  return (
    <CollapseTableIcon
      className={`hide-icon-${collapse ? 'angle-right' : 'angle-down'}`}
      onClick={() => collapseTableChange({ modelName, fieldName, id, collapse })}
    />
  )
}

export const DefaultDetailLabel = ({ schema, modelName, fieldName, node, customProps }) => {
  const LabelInfoComponent = R.path(['components', 'labelInfo'], schema.getField(modelName, fieldName))
  if (skipOverride(LabelInfoComponent)) {
    return null
  }
  const fieldLabel = schema.getFieldLabel({ modelName, fieldName, node, customProps })
  if (LabelInfoComponent) {
    return <LabelInfoPopover {...{ LabelInfoComponent, fieldLabel }} />
  }
  return <span>{fieldLabel}</span>
}

export const DefaultDetailAttribute = ({
  schema,
  modelName,
  fieldName,
  node,
  editData,
  tooltipData,
  selectOptions,
  id,
  path,
  customProps
}) => {
  const actions = schema.getActions(modelName)

  const LabelOverride = schema.getDetailLabelOverride(modelName, fieldName)
  const ValueOverride = schema.getDetailValueOverride(modelName, fieldName)

  const DetailLabel = LabelOverride || DefaultDetailLabel
  const DetailValue = ValueOverride || Field

  const editable = schema.isFieldEditable({ modelName, fieldName, node, customProps })
  const fieldType = R.prop('type', schema.getField(modelName, fieldName))

  if (skipOverride(LabelOverride) && skipOverride(ValueOverride)) {
    return null
  }

  if (isFieldEditing(editData, modelName, node.id, fieldName) !== false) {
    const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })
    const relModelName = R.prop('modelName', relSchemaEntry)

    const onEditCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions)
    const onEditSubmitClick = R.path(['edit', 'onDetailAttributeSubmit'], actions)
    const onFileSubmit = R.path(['edit', 'onFileSubmit'], actions)

    const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
    const creatable = schema.isCreatable({ modelName: relModelName, parentNode: node, customProps })
    const targetInverseFieldName = R.prop('backref', fieldType)
    const targetModelName = R.prop('target', fieldType)
    const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)

    return (
      <React.Fragment>
        <dt className='col-sm-3 text-sm-right'>
          {
            skipOverride(LabelOverride) ? null : <DetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
          }
        </dt>
        <dd className='col-sm-9'>
          <div className='detail-edit d-inline-block pull-left'>
            <EditInput {...{
              schema,
              modelName,
              fieldName,
              node,
              editData: fieldEditData,
              error,
              selectOptions,
            }} />
          </div>
          <div className='inline-btn-group'>
            <EditSaveButton {...{
              onClick: (fieldType === 'file')
                ? evt => onFileSubmit({ modelName, fieldName, id })
                : evt => onEditSubmitClick({ modelName, fieldName, id })
            }} />
            <EditCancelButton {...{
              onClick: (evt) => onEditCancelClick({ modelName, id, fieldName }),
              modelName,
              id
            }} />
            {
              R.type(fieldType) === 'Object' && creatable &&
              <DetailCreateButton {...{
                schema,
                targetInverseFieldName,
                targetModelName,
                path,
                node
              }}
              />
            }
          </div>
        </dd>
      </React.Fragment>
    )
  } else {
    const onEdit = R.path(['edit', 'onAttributeEdit'], actions)
    const onFileDelete = R.path(['delete', 'onFileDelete'], actions)
    const isFileType = fieldType === inputTypes.FILE_TYPE
    const hasValue = R.propOr(false, fieldName, node)

    return (
      <React.Fragment>
        <dt className='col-sm-3 text-sm-right'>
          {
            skipOverride(LabelOverride) ? null : <DetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
          }
        </dt>
        <dd className='col-sm-9'>
          {
            skipOverride(ValueOverride) ? null : <DetailValue {...{
              schema,
              modelName,
              fieldName,
              node,
              id,
              tooltipData,
              customProps
            }} />
          }
          {editable &&
            <InlineEditButton {...{
              onEditClick: (evt) => onEdit({
                modelName,
                fieldName,
                id,
                value: R.prop(fieldName, node)
              })
            }} />
          }
          {(editable && isFileType && hasValue) &&
            <FileDelete {...{
              id,
              fieldName,
              onFileDelete: () => onFileDelete({ modelName, fieldName, id })
            }}/>
          }
        </dd>
      </React.Fragment>
    )
  }
}

export const DetailCreateButton = ({ schema, targetModelName, path, targetInverseFieldName, node }) => {
  const onCreateClick = R.path(['create', 'onDetailCreate'], schema.getActions(targetModelName))

  const onClick = () => onCreateClick({
    modelName: targetModelName,
    path,
    targetInverseFieldName,
    node
  })
  return <CreateButton {...{ onClick }} />
}

export const DefaultDetailTableTitleWrapper = ({ children }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>
        {children}
      </h4>
    </div>
  )
}

export const DefaultDetailO2MTableTitle = ({ schema, modelName, fieldName, id, targetInverseFieldName, targetModelName, path, node, collapsable, collapse, collapseTableChange, customProps }) => {
  const creatable = schema.isCreatable({ modelName: targetModelName, parentNode: node, customProps })

  return (
    <DefaultDetailTableTitleWrapper>
      {collapsable && <CollapseTableButton {...{
        modelName,
        fieldName,
        id,
        collapse,
        collapseTableChange
      }}/>}
      <DefaultDetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
      { creatable && <DetailCreateButton {...{
        schema,
        targetModelName,
        path,
        targetInverseFieldName,
        node
      }} /> }
    </DefaultDetailTableTitleWrapper>
  )
}

export const DefaultDetailM2MTableTitle = ({
  schema,
  modelName,
  id,
  fieldName,
  node,
  targetInverseFieldName,
  path,
  targetModelName,
  collapsable,
  collapse,
  collapseTableChange,
  customProps
}) => {
  const editable = schema.isFieldEditable({ modelName, fieldName, node, customProps })

  return (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>
        {collapsable && <CollapseTableButton {...{
          modelName,
          fieldName,
          id,
          collapse,
          collapseTableChange
        }}/>}
        {schema.getFieldLabel({ modelName, fieldName, node, customProps })}
      </h4>
      {editable && <div className='pl-2 d-inline'>
        <TableEditButton {...{
          schema,
          modelName,
          id,
          fieldName,
          targetInverseFieldName,
          node,
          path,
          targetModelName
        }} />
      </div>}
    </div>
  )
}

export const DefaultDetailM2MFieldLabel = ({
  schema,
  modelName,
  fieldName,
  node,
  targetInverseFieldName,
  path,
  targetModelName,
  customProps
}) => {
  const creatable = schema.isCreatable({ modelName: targetModelName, parentNode: node, customProps })
  const required = R.prop('required', schema.getField(modelName, fieldName))
  const Label = () => (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>{schema.getFieldLabel({ modelName, fieldName, node, customProps })}</h4>
      { required && ' *'}
      { creatable && <DetailCreateButton {...{
        schema,
        targetModelName,
        path,
        targetInverseFieldName,
        node
      }} /> }
    </div>
  )
  return Label
}

export const DefaultDetailTable = ({
  schema,
  modelName,
  id,
  fieldName,
  node,
  path,
  editData,
  selectOptions,
  tooltipData,
  tableView,
  modalData,
  customProps,
  summary
}) => {
  const fieldType = R.path([modelName, 'fields', fieldName, 'type'], schema.schemaJSON)
  const targetInverseFieldName = R.prop('backref', fieldType)
  const targetModelName = R.prop('target', fieldType)
  const data = R.propOr(null, fieldName, node)
  const fieldOrder = R.path([modelName, 'fields', fieldName, 'type', 'tableFields'], schema.schemaJSON)
  const actions = schema.getActions(modelName)
  const onDelete = R.path(['delete', 'onDetailDelete'], actions)
  const onEditSubmit = R.path(['edit', 'onDetailTableEditSubmit'], actions)
  const type = schema.getType(modelName, fieldName)
  const collapse = R.path([modelName, 'fields', fieldName, 'collapse'], tableView)
  const collapseTableChange = R.path(['tableOptions', 'collapseTableChange'], actions)
  const collapsable = schema.getCollapsable(modelName, fieldName)

  if (!data) { return <div className='container'>Loading...</div> }

  const ValueOverride = schema.getDetailValueOverride(modelName, fieldName)
  const DetailValue = ValueOverride || Table

  if (type.includes('OneToMany')) {
    const LabelOverride = schema.getDetailLabelOverride(modelName, fieldName)
    const DetailLabel = LabelOverride || DefaultDetailO2MTableTitle
    return (
      <React.Fragment key={`Fragment-${id}-${targetModelName}-${fieldName}`}>
        { skipOverride(LabelOverride) ? null : <DetailLabel {...{
          schema,
          modelName,
          fieldName,
          id,
          targetInverseFieldName,
          node,
          path,
          targetModelName,
          collapsable,
          collapse,
          collapseTableChange,
          customProps
        }} />
        }
        { skipOverride(ValueOverride) ? null : <DetailValue
          key={`Table-${id}-${targetModelName}-${fieldName}`}
          {...{
            schema,
            parentId: id,
            parentModelName: modelName,
            parentFieldName: fieldName,
            modelName: targetModelName,
            editData,
            selectOptions,
            tooltipData,
            node,
            data,
            onDelete,
            onEditSubmit: ({ ...props }) => onEditSubmit({
              parentModelName: modelName,
              parentId: id,
              ...props
            }),
            fieldOrder,
            tableView,
            collapse,
            modalData,
            customProps,
            summary
          }}
        /> }
      </React.Fragment>
    )
  } else if (type === 'ManyToMany') {
    if (isFieldEditing(editData, modelName, id, fieldName)) {
      const actions = schema.getActions(modelName)
      const onEditInputChange = R.path(['edit', 'onEditInputChange'], actions)
      const onSaveClick = R.path(['edit', 'onDetailAttributeSubmit'], actions)
      const onCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions)

      const LabelOverride = schema.getDetailLabelOverride(modelName, fieldName)
      const DetailLabel = LabelOverride || DefaultDetailM2MFieldLabel({
        schema,
        modelName,
        fieldName,
        node,
        targetInverseFieldName,
        path,
        targetModelName,
        customProps
      })

      return (
        <React.Fragment>
          <Input {...{
            schema,
            modelName,
            fieldName,
            node,
            value: getFieldEditData(editData, modelName, fieldName, id),
            error: getFieldErrorEdit(editData, modelName, fieldName, id),
            selectOptions,
            customLabel: DetailLabel,
            onChange: ({ ...props }) => onEditInputChange({
              id,
              modelName,
              ...props
            }),
            customProps
          }} />
          <div className='table-btn-padding'>
            <EditSaveButton {...{
              onClick: (evt) => onSaveClick({
                modelName,
                id,
                fieldName
              })
            }} />
            <EditCancelButton {...{
              onClick: (evt) => onCancelClick({
                modelName,
                id,
                fieldName
              })
            }} />
          </div>
        </React.Fragment>
      )
    }

    const LabelOverride = schema.getDetailLabelOverride(modelName, fieldName)
    const DetailLabel = LabelOverride || DefaultDetailM2MTableTitle

    if (skipOverride(LabelOverride) && skipOverride(ValueOverride)) {
      return null
    }

    return (
      <React.Fragment key={`Fragment-${id}-${targetModelName}-${fieldName}`}>
        { skipOverride(LabelOverride) ? null : <DetailLabel {...{
          schema,
          modelName,
          id,
          fieldName,
          node,
          targetInverseFieldName,
          path,
          targetModelName,
          collapsable,
          collapse,
          collapseTableChange,
          customProps
        }} /> }
        { skipOverride(ValueOverride) ? null : <DetailValue
          key={`Table-${id}-${targetModelName}-${fieldName}`}
          {...{
            schema,
            parentId: id,
            parentModelName: modelName,
            parentFieldName: fieldName,
            modelName: targetModelName,
            editData,
            selectOptions,
            tooltipData,
            node,
            data,
            onDelete,
            onEditSubmit: ({ ...props }) => onEditSubmit({
              parentModelName: modelName,
              parentId: id,
              ...props
            }),
            fieldOrder,
            tableView,
            collapse,
            modalData,
            customProps,
          }}
        /> }
      </React.Fragment>
    )
  }
}

export const partitionDetailFields = ({ schema, modelName, node, include = null, customProps }) => {
  let detailFields = schema.getDetailFields({ modelName, node, customProps })

  if (include) {
    detailFields = detailFields.filter(fieldName => R.includes(fieldName, include))
  }
  return R.partition(
    (fieldName) => {
      const detailAttribute = R.prop('detailAttribute', schema.getField(modelName, fieldName))
      if (!R.isNil(detailAttribute)) {
        return !detailAttribute
      }
      return schema.isOneToMany(modelName, fieldName) ||
        schema.isManyToMany(modelName, fieldName)
    }
    ,
    detailFields
  )
}

export const DefaultDetailPageTitle = ({ schema, modelName, node, modalData, customProps }) => {
  const model = schema.getModelLabel({ modelName, node, customProps })
  const label = schema.getDisplayValue({ modelName, node, customProps })
  const actions = schema.getActions(modelName)
  const onDelete = R.path(['delete', 'onDetailDeleteFromDetailPage'], actions)
  const onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions)
  const modalId = 'confirm-delete-' + modelName
  const id = R.prop('id', node)
  const HeaderLink = schema.getHasIndex(modelName) ? <Link to={'/' + modelName}>{model}</Link> : model
  return (
    <div><h2 className='d-inline'>{HeaderLink}:<b> {label}</b></h2>
      { schema.isDeletable({ modelName, node, customProps }) &&
        <div className='float-right'>
          <DeleteButton {...{ modalId, onDeleteWarning, modelName, id }} />
          <DeleteDetail {...{
            schema,
            id,
            modalId,
            modelName,
            onDelete,
            modalData,
            customProps
          }} />
        </div>
      }
    </div>
  )
}

export const DetailFields = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  tableFields,
  descriptionList,
  editData,
  tooltipData,
  selectOptions,
  path,
  tableView,
  customProps,
  summary
}) => {
  if (!node) { return <div className='container'>Loading...</div> }

  if (!tableFields && !descriptionList) { [tableFields, descriptionList] = partitionDetailFields({ schema, modelName, node, customProps }) }

  return (
    <React.Fragment>
      <dl className='row'>
        {descriptionList.map(fieldName => {
          if (schema.shouldDisplayDetail({ modelName, fieldName, node, customProps }) === false) {
              return null
          }
          const override = schema.getDetailFieldOverride(modelName, fieldName)

          if (skipOverride(override)) {
            return null
          }
          const DetailAttribute = override || DefaultDetailAttribute
          // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props
          return (
            <DetailAttribute key={`DetailAttribute-${id}-${modelName}-${fieldName}`}
              {...{
                schema,
                modelName,
                fieldName,
                node,
                selectOptions,
                editData,
                tooltipData,
                modalData,
                path,
                id,
                tableView,
                customProps
              }}
            />
          )
        })}
      </dl>
      {tableFields.map(fieldName => {
        if (schema.shouldDisplayDetail({ modelName, fieldName, node, customProps}) === false) {
            return null
        }
        const override = schema.getDetailFieldOverride(modelName, fieldName)

        if (skipOverride(override)) {
          return null
        }
        const DetailTable = override || DefaultDetailTable
        // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props
        return (
          <DetailTable key={`DetailTable-${id}-${modelName}-${fieldName}`}
            {...{
              schema,
              modelName,
              fieldName,
              node,
              selectOptions,
              editData,
              tooltipData,
              modalData,
              path,
              id,
              tableView,
              customProps,
              summary
            }}
          />
        )
      })}
    </React.Fragment>
  )
}

const Wrapper = ({ children }) => (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        {children}
      </div>
    </div>
  </div>
)

export const DefaultDetail = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  editData,
  path,
  match,
  tooltipData,
  tableView,
  selectOptions,
  customProps,
  summary
}) => {
  const DetailTitleOverride = schema.getDetailTitleOverride(modelName)
  const DetailPageOverride = schema.getDetailPageOverride(modelName)

  const tabs = schema.getModelAttribute(modelName, 'tabs')

  const DefaultDetailPage = tabs && tabs.length > 0 ? RecursiveTab : DetailFields

  const DetailTitle = DetailTitleOverride || DefaultDetailPageTitle
  const DetailPage = DetailPageOverride || DefaultDetailPage

  if (R.isEmpty(node)) {
    return <div className='container'>Loading...</div>
  }

  if (node === null) {
    return <Redirect to={`/${modelName}`} />
  }

  if (skipOverride(DetailTitleOverride) && skipOverride(DetailPageOverride)) {
    return null
  }

  return (
    <Wrapper>
      {skipOverride(DetailTitleOverride) ? null : (
        <DetailTitle key={`DetailTitle-${id}-${schema}-${modelName}`}
          {...{
            schema,
            modelName,
            id,
            node,
            modalData,
            editData,
            path,
            match,
            tooltipData,
            selectOptions,
            customProps
          }}
        />
      )}
      {skipOverride(DetailPageOverride) ? null : (
        <DetailPage key={`DetailPage-${id}-${schema}-${modelName}`}
          {...{
            schema,
            modelName,
            id,
            node,
            modalData,
            editData,
            tooltipData,
            match,
            tabs,
            path,
            fields: [],
            tableView,
            selectOptions,
            customProps,
            summary
          }}
        />
      )}
    </Wrapper>
  )
}

const Detail = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  editData,
  path,
  match, // 'match' should be passed in by React by default
  tooltipData,
  tableView,
  selectOptions,
  customProps,
  summary
}) => {
  const DetailOverride = schema.getDetailOverride(modelName)

  const DetailComponent = DetailOverride || DefaultDetail

  return skipOverride(DetailOverride) ? null : (
    <DetailComponent key={`DetailComponent-${id}-${schema}-${modelName}`}
      {...{
        schema,
        modelName,
        id,
        node,
        modalData,
        editData,
        path,
        match,
        tooltipData,
        tableView,
        selectOptions,
        customProps,
        summary
      }}
    />
  )
}

export default Detail

