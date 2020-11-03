/* global FileReader */

import React from 'react'
import * as R from 'ramda'
import FlexibleInput from '../input/index'
import { inputTypes } from '../consts'
import { skipOverride } from '../Utils'
import { arrayBufferToStoreValue } from '../utils/fileConverters'
import CreateButton from '../CreateButton'
import { getRelSchemaEntry } from '../table/Field'

export const relationshipLabelFactory = ({ schema, modelName, fieldName, onClick, customProps }) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })
  const relModelName = R.prop('modelName', relSchemaEntry)
  const id = `input-${modelName}-${fieldName}`
  const required = R.prop('required', schema.getField(modelName, fieldName))
  const creatable = schema.isCreatable({ modelName: relModelName, customProps })

  const Label = ({ labelStr }) => (
    <label htmlFor={id}>
      <span>{labelStr}</span>
      { required && ' *'}
      { creatable && <CreateButton {...{
        onClick
      }} /> }
    </label>
  )

  return Label
}

export const DisabledInput = ({ value, label }) => (
  <React.Fragment>
    <span>{label}</span>
    {
      // TODO: Move into css files
    }
    <div style={{ paddingBottom: '10px', paddingTop: '10px' }} >
      <div style={{ padding: '7px 7px 7px 12px', backgroundColor: '#E0E0E0', minHeight: '40px' }} className='border rounded primary'>
        {value}
      </div>
    </div>
  </React.Fragment>
)

const Input = ({
  schema,
  modelName,
  fieldName,
  node,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  disabled,
  customLabel,
  formStack,
  autoFocus,
  onKeyDown,
  customProps
}) => {
  const InputOverride = schema.getInputOverride(modelName, fieldName)
  const actions = schema.getActions(modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)
  const onCreatableMenuOpen = R.path(['input', 'onCreatableMenuOpen'], actions)

  if (skipOverride(InputOverride)) {
    return null
  }

  if (InputOverride) {
    return <InputOverride
      {...{
        schema,
        modelName,
        fieldName,
        node,
        value,
        error,
        inline,
        onChange,
        selectOptions,
        disabled,
        customLabel,
        onMenuOpen,
        onCreatableMenuOpen,
        autoFocus,
        onKeyDown,
        customProps
      }} />
  }

  if (disabled) {
    const label = schema.getFieldLabel({
      modelName,
      fieldName,
      node: R.path(['originNode'], formStack),
      customProps
    })

    return <DisabledInput {...{ value, label }} />
  }

  const fieldHelp = schema.getFieldHelpText(modelName, fieldName)

  return (
    <div>
      <InputCore {...{
        schema,
        modelName,
        fieldName,
        node,
        value,
        error,
        inline,
        onChange,
        selectOptions,
        disabled,
        customLabel,
        onMenuOpen,
        onCreatableMenuOpen,
        autoFocus,
        onKeyDown,
        customProps,
      }} />
      {fieldHelp && <small className='help-text'>{fieldHelp}</small>}
    </div>
  )
}

export const getOnChange = ({ inputType, onChange, fieldName }) => {
  const defaultHandleOnChange = val => onChange({
    fieldName,
    value: val
  })
  if (inputType !== inputTypes.FILE_TYPE) {
    return defaultHandleOnChange
  }

  return (evt => {
    const fileReader = new FileReader()

    const onloadend = () => {
      // handle result of read
      if (!fileReader.error) {
        const content = fileReader.result
        // since cannot save ArrayBuffer to store, convert value
        const converted = arrayBufferToStoreValue(content)
        defaultHandleOnChange(converted)
      } else {
        // TODO handle error
      }
    }

    if (evt.target.files.length > 0) {
      // initiate read
      fileReader.onloadend = onloadend
      fileReader.readAsArrayBuffer(evt.target.files[0])
    }
  })
}

export const InputCore = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  customLabel,
  onMenuOpen,
  onCreatableMenuOpen,
  customInput,  // optional; used for FlexibleInput only; differs from 'customProps'
  autoFocus,
  onKeyDown,
  customProps
}) => {
  const inputType = schema.getType(modelName, fieldName)

  const defaultHandleOnChange = getOnChange({ inputType, onChange, fieldName })
  const fieldLabel = schema.getFieldLabel({ modelName, fieldName, customProps })
  const defaultProps = {
    id: `input-${modelName}-${fieldName}`,
    type: inputType,
    onChange: defaultHandleOnChange,
    labelStr: inline ? null : fieldLabel,
    value,
    error,
    required: R.prop('required', schema.getField(modelName, fieldName)),
    customInput,
    autoFocus,
    onKeyDown
  }
  const enumChoices = schema.getEnumChoices(modelName, fieldName)
  const enumChoiceOrder = schema.getEnumChoiceOrder(modelName, fieldName)
  let options

  switch (inputType) {
    case inputTypes.STRING_TYPE:
    case inputTypes.INT_TYPE:
    case inputTypes.TEXTAREA_TYPE:
    case inputTypes.DATE_TYPE:
    case inputTypes.URL_TYPE:
    case inputTypes.EMAIL_TYPE:
    case inputTypes.PHONE_TYPE:
    case inputTypes.BOOLEAN_TYPE:
    case inputTypes.CURRENCY_TYPE:
    case inputTypes.PASSWORD_TYPE:
    case inputTypes.FILE_TYPE:
      return <FlexibleInput {...defaultProps} />
    case inputTypes.FLOAT_TYPE:
      return (
        <FlexibleInput
          {...{
            ...defaultProps,
            type: inputTypes.INT_TYPE,
            customInput: { step: 'any' }
          }}
        />
      )
    case inputTypes.ENUM_TYPE:
      options = schema.getOptionsOverride({
        modelName,
        fieldName,
        options: enumChoiceOrder.map(choice => ({
          label: enumChoices[choice],
          value: choice
        })),
        value,
        customProps
      })
      return (
        <FlexibleInput key={`FlexibleInput-${id}-${modelName}-${fieldName}`}
          {...{
            ...defaultProps,
            type: inputTypes.SELECT_TYPE,
            options,
            customInput: { step: 'any' }
          }}
        />
      )
    case inputTypes.ONE_TO_ONE_TYPE:
    case inputTypes.MANY_TO_ONE_TYPE:
    case inputTypes.ONE_TO_MANY_TYPE:
    case inputTypes.MANY_TO_MANY_TYPE:
      options = schema.getOptionsOverride({
        modelName,
        fieldName,
        options: R.path([modelName, fieldName], selectOptions),
        value,
        customProps
      })
      return (
        <FlexibleInput key={`FlexibleInput-${id}-${modelName}-${fieldName}`}
          {...{
            ...R.dissoc('type', defaultProps),
            type: inputTypes.SELECT_TYPE,
            isMulti: (
              inputType === inputTypes.ONE_TO_MANY_TYPE ||
              inputType === inputTypes.MANY_TO_MANY_TYPE
            ),
            customLabel,
            onMenuOpen: evt => onMenuOpen({ modelName, fieldName }),
            options
          }}
        />
      )
    case inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return (
        <FlexibleInput key={`FlexibleInput-${id}-${modelName}-${fieldName}`}
          {...{
            ...defaultProps,
            customLabel,
            onMenuOpen: () => onCreatableMenuOpen({ modelName, fieldName }),
            options: R.path([modelName, fieldName], selectOptions)
          }}
        />
      )
    default:
      return <p>{fieldName} default input</p>
  }
}

export default Input
