import React from 'react'
import * as R from 'ramda'
import FlexibleInput from '../input/index'
import { inputTypes } from '../consts'
import { useOverride } from '../Utils'
import CreateButton from '../CreateButton'
import { getRelSchemaEntry } from '../table/Field'

export const relationshipLabelFactory = ({
  schema,
  modelName,
  fieldName,
  onClick,
  customProps
}: {
  schema: any
  modelName: string
  fieldName: string
  onClick: any
  customProps: any
}) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })
  const relModelName = R.prop('modelName', relSchemaEntry)
  const id = `input-${modelName}-${fieldName}`
  const required = R.prop('required', schema.getField(modelName, fieldName))
  const creatable = schema.isCreatable({
    modelName: relModelName,
    customProps
  })

  type LabelType = { labelStr: string }
  const Label = ({ labelStr }: LabelType) => (
    <label htmlFor={id}>
      <span className={required ? 'required-field-label' : ''}>{labelStr}</span>
      {creatable && (
        <CreateButton
          {...{
            onClick,
            to: relModelName,
            replaceEntry: true
          }}
        />
      )}
    </label>
  )

  return Label
}

/**
 * React Component for Disabled Input, for Create page
 * @param value
 * @param label
 * @return Rendered React Component
 */
type DisabledInputType = { value: any; label: string }
export const DisabledInput = ({ value, label }: DisabledInputType) => (
  <div className="conv-disabled-input">
    <span>{label}</span>
    {
      // TODO: Move into css files
    }
    <div className="disabled-input-padding">
      <div className="disabled-input-value">{value}</div>
    </div>
  </div>
)

/**
 * React Component for the Input
 * @param schema model schema
 * @param modelName the name of the model
 * @param fieldName the name of the field
 * @param value current value of the input
 * @param error error value display below input
 * @param inline boolean, if false use a field label above input
 * > field label only used on create page
 * @param onChange function called when the input value is changed
 * @param selectOptions options used by the select input type
 * @param disabled boolean if the input is disabled
 * @param customLabel react component for a specialized type of label
 * @param formStack information about calling page and also information about errors, if on a create page
 * @param autoFocus refers to specific fields (see isAutoFocusInput()) that have autofocus input feature
 * @param onKeyDown function called when a key has been pressed (on inside input), optional
 * > if on create page save if enter pressed
 * @param customProps user defined props and customization
 * @param showPopover boolean show label info in a popover
 * @return Rendered React Component
 */
type InputType = {
  schema: any
  modelName: string
  fieldName: string
  value: any
  error?: any
  inline?: any
  onChange: any
  selectOptions: any
  disabled?: boolean
  customLabel?: any
  customInput?: any
  formStack?: any
  autoFocus?: any
  onKeyDown?: any
  customProps?: any
  showPopover?: boolean
}
const Input = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline = undefined, //false
  onChange,
  selectOptions,
  disabled = undefined, //false
  customLabel,
  formStack = undefined,
  autoFocus = undefined, //???
  onKeyDown = undefined,
  customProps,
  showPopover = false
}: InputType) => {
  const InputOverride = schema.getInputOverride(modelName, fieldName)
  const ChosenInput = useOverride(InputOverride, InputCore)
  const actions = schema.getActions(modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)
  const onCreatableMenuOpen = R.path(['input', 'onCreatableMenuOpen'], actions)

  return (
    <ChosenInput
      {...{
        schema,
        modelName,
        fieldName,
        value,
        error,
        inline,
        onChange,
        selectOptions,
        disabled,
        customLabel,
        formStack,
        onMenuOpen,
        onCreatableMenuOpen,
        autoFocus,
        onKeyDown,
        customProps,
        showPopover
      }}
    />
  )
}

/**
 * Wraps the on change function in a function that knows which field is being changed
 * and handles special input cases
 * @param inputType the type of data the input handles
 * @param onChange function called when change occurs
 * @param fieldName name of the field targeted by the input
 * @return wrapped onChange function
 */
export const getOnChange = ({
  inputType,
  onChange,
  fieldName
}: {
  inputType: any
  onChange: any
  fieldName: string
}) => {
  const defaultHandleOnChange = (val: any) =>
    onChange({
      fieldName,
      value: val
    })

  if (inputType !== inputTypes.FILE_TYPE) {
    return defaultHandleOnChange
  }

  return (evt: any) => {
    if (evt.target.files.length > 0) {
      defaultHandleOnChange(evt.target.files[0])
    }
  }
}

/**
 * Overridable React Component for Input
 * @param schema model schema
 * @param modelName the name of the model
 * @param fieldName the name of the field
 * @param value current value of the input
 * @param error error value display below input
 * @param inline boolean, if false use a field label above input
 * > field label only used on create page
 * @param onChange function called when the input value is changed
 * @param selectOptions options used by the select input type
 * @param disabled boolean if the input is disabled
 * @param customLabel react component for a specialized type of label
 * @param formStack information about calling page, if on a create page
 * @param customInput Overrides any props passed into the component, or those set by default in this library.
 * > For example, to override default settings for a "Date" component structure the data like so:
 * > {placeholderText:'Click here', fixedHeight:false}
 * @param autoFocus refers to specific fields (see isAutoFocusInput()) that have autofocus input feature
 * @param onKeyDown function called when a key has been pressed (on inside input), optional
 * > if on create page save if enter pressed
 * @param customProps user defined props and customization
 * @param showPopover boolean show label info in a popover
 * @return Rendered React Component
 */
export const InputCore = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  disabled,
  customLabel,
  formStack,
  customInput, // optional; used for FlexibleInput only; differs from 'customProps'
  autoFocus,
  onKeyDown,
  customProps,
  showPopover
}: InputType) => {
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
    <div className={'conv-input conv-input-model-' + modelName}>
      <InputInnerCore
        {...{
          schema,
          modelName,
          fieldName,
          value,
          error,
          inline,
          onChange,
          selectOptions,
          customLabel,
          customInput, // optional; used for FlexibleInput only; differs from 'customProps'
          autoFocus,
          onKeyDown,
          customProps,
          showPopover
        }}
      />
      {fieldHelp && <small className="help-text">{fieldHelp}</small>}
    </div>
  )
}

const InputInnerCore = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  customLabel,
  customInput, // optional; used for FlexibleInput only; differs from 'customProps'
  autoFocus,
  onKeyDown,
  customProps,
  showPopover
}: InputType) => {
  const inputType = schema.getType(modelName, fieldName)
  const actions = schema.getActions(modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions) as any
  const onCreatableMenuOpen = R.path(
    ['input', 'onCreatableMenuOpen'],
    actions
  ) as any

  const defaultHandleOnChange = getOnChange({ inputType, onChange, fieldName })
  const fieldLabel = schema.getFieldLabel({
    modelName,
    fieldName,
    customProps
  })
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
    onKeyDown,
    LabelInfoComponent: R.path(
      ['components', 'labelInfo'],
      schema.getField(modelName, fieldName)
    ),
    showPopover
  }
  const enumChoices = schema.getEnumChoices(modelName, fieldName)
  const enumChoiceOrder = schema.getEnumChoiceOrder(modelName, fieldName)
  let options

  switch (inputType) {
    case inputTypes.STRING_TYPE:
    case inputTypes.INT_TYPE:
    case inputTypes.TEXTAREA_TYPE:
    case inputTypes.DATE_TYPE:
    case inputTypes.DATETIME_TYPE:
    case inputTypes.COLOR_TYPE:
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
        options: enumChoiceOrder.map((choice: any) => ({
          label: enumChoices[choice],
          value: choice
        })),
        value,
        customProps
      })
      return (
        <FlexibleInput
          key={`FlexibleInput-${modelName}-${fieldName}`}
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
        <FlexibleInput
          key={`FlexibleInput-${modelName}-${fieldName}`}
          {...{
            ...R.dissoc('type', defaultProps),
            type: inputTypes.SELECT_TYPE,
            isMulti:
              inputType === inputTypes.ONE_TO_MANY_TYPE ||
              inputType === inputTypes.MANY_TO_MANY_TYPE,
            customLabel,
            onMenuOpen: () => onMenuOpen({ modelName, fieldName }),
            options
          }}
        />
      )
    case inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return (
        <FlexibleInput
          key={`FlexibleInput-${modelName}-${fieldName}`}
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
