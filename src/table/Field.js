import React from 'react'
import * as consts from '../consts'
import * as R from 'ramda'
import DetailLink from '../DetailLink'
import Switch from 'rc-switch'
import { ImageLinkModal } from '../Modal'
import Tooltip from '../Tooltip'

// gets the schema of the relationship model, based on field meta
export const getRelSchemaEntry = ({ schema, modelName, fieldName }) => {
  const fieldTargetModel = R.path(['type', 'target'], schema.getField(modelName, fieldName))

  return schema.getModel(fieldTargetModel)
}

const FieldString = ({ schema, modelName, fieldName, node, noDataDisplayValue }) => {
  const value = R.prop(fieldName, node)
  const displayString = (R.isNil(value) || value === '') ? noDataDisplayValue : value

  return (
    <span className='text-area-display'>{displayString}</span>
  )
}

const FieldBoolean = ({ schema, modelName, fieldName, node }) => {
  const displayBool = R.propOr(false, fieldName, node) // need propOr(false...
  return <Switch
    checked={displayBool}
  />
}

// Render a link to the value. If the value does not start with any of the prefixes,
// append the first prefix. Produces HTTPS URLs by default.
const FieldLink = ({ schema, modelName, fieldName, node, prefix = ['https://', 'http://'], noDataDisplayValue }) => {
  // Ensure prefix is a list, allowing a single string instead of a list.
  prefix = R.pipe(R.prepend(prefix), R.flatten)([])
  let href = R.prop(fieldName, node)
  if (!href) { return <span>{noDataDisplayValue}</span> }

  const displayString = href

  if (!R.any(item => R.startsWith(item, href), prefix)) {
    href = prefix[0] + href
  }

  return <a href={href}>{ displayString }</a>
}

const FieldCurrency = ({ schema, modelName, fieldName, node }) => {
  const num = R.prop(fieldName, node)
  const displayString = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)

  return (
    <span>{displayString}</span>
  )
}

const FieldEnum = ({ schema, modelName, fieldName, node, noDataDisplayValue }) => {
  const value = R.prop(fieldName, node)
  if (value) {
    return (
      <span>{ schema.getEnumLabel(modelName, fieldName, value) }</span>
    )
  }
  return <span>{noDataDisplayValue}</span>
}

const FieldImageModal = ({ schema, modelName, fieldName, id, node, customProps }) => {
  const url = R.prop(fieldName, node)
  const label = schema.getFieldLabel({ modelName, fieldName, node, customProps })
  const modalId = `img-modal-${modelName}-${fieldName}-${id}`

  return <ImageLinkModal {...{ id: modalId, title: label, url }} />
}

export const FieldToOne = ({ schema, modelName, fieldName, node, tooltipData, noDataDisplayValue, customProps }) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })

  const relModelName = R.prop('modelName', relSchemaEntry)

  const displayString = schema.getDisplayValue({ modelName: relModelName, node, customProps })
  const relId = R.prop('id', node)

  if (!displayString) { return <span>{noDataDisplayValue}</span> }

  const displayTooltip = (schema.getTooltipFields({ modelName: relModelName, customProps }).length !== 0)
  if (displayTooltip) {
    return (
      <Tooltip
        {...{
          schema,
          modelName: relModelName,
          id: relId,
          data: R.pathOr([], [relModelName, relId], tooltipData)
        }}
      >
        <DetailLink {...{
          modelName: relModelName,
          id: relId
        }}>
          {displayString}
        </DetailLink>
      </Tooltip>
    )
  } else {
    return (
      <DetailLink {...{
        modelName: relModelName,
        id: relId }}>
        {displayString}
      </DetailLink>)
  }
}

export const FieldToMany = ({ schema, modelName, fieldName, tooltipData, node, noDataDisplayValue }) => {
  const multiRelField = R.prop(fieldName, node)

  const relListWithLink = (field, idx, obj) => (
    <React.Fragment key={`fragment-${field.id}`}>
      <FieldToOne
        key={`field-m2o-${field.id}`}
        {...{ schema, modelName, fieldName, tooltipData, node: field }}
      />
      { (idx !== (obj.length - 1)) && <span>{', '}</span>}
    </React.Fragment>
  )

  return (
    <span>{ (multiRelField && multiRelField.length > 0)
      ? multiRelField.map(relListWithLink) : noDataDisplayValue}
    </span>
  )
}

export const Field = ({ schema, modelName, fieldName, tooltipData, node, id, customProps }) => {
  const props = {
    schema,
    modelName,
    fieldName,
    tooltipData,
    node,
    id,
    customProps
  }

  const type = schema.getType(modelName, fieldName)
  const noDataDisplayValue = schema.getNoDataDisplayValue({ modelName, fieldName, node, customProps })

  switch (type) {
    case consts.inputTypes.STRING_TYPE:
    case consts.inputTypes.FLOAT_TYPE:
    case consts.inputTypes.INT_TYPE:
    case consts.inputTypes.DATE_TYPE:
    case consts.inputTypes.TEXTAREA_TYPE:
    case consts.inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return <FieldString {...{ noDataDisplayValue, ...props }} />
    case consts.inputTypes.ENUM_TYPE:
      return <FieldEnum {...{ noDataDisplayValue, ...props }} />
    case consts.inputTypes.URL_TYPE:
      return <FieldLink {...{ noDataDisplayValue, ...props }} />
    case consts.inputTypes.FILE_TYPE:
      return <FieldImageModal {...props} />
    case consts.inputTypes.PHONE_TYPE:
      return <FieldLink {...{ prefix: 'tel:', noDataDisplayValue, ...props }} />
    case consts.inputTypes.EMAIL_TYPE:
      return <FieldLink {...{ prefix: 'mailto:', noDataDisplayValue, ...props }} />
    case consts.inputTypes.BOOLEAN_TYPE:
      return <FieldBoolean {...props} />
    case consts.inputTypes.CURRENCY_TYPE:
      return <FieldCurrency {...props} />
    case consts.inputTypes.MANY_TO_ONE_TYPE:
      return <FieldToOne {...{
        ...props,
        node: R.prop(fieldName, node),
        schema,
        modelName,
        fieldName,
        tooltipData,
        noDataDisplayValue
      }} />
    case consts.inputTypes.MANY_TO_MANY_TYPE:
    case consts.inputTypes.ONE_TO_MANY_TYPE:
      return <FieldToMany {...{ noDataDisplayValue, ...props }} />
    case consts.inputTypes.ONE_TO_ONE_TYPE:
      return <span>OneToOne</span>
    default:
      return <span>NO TYPE</span>
  }
}

export default Field
