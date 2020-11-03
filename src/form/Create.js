import React from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'
import Input, { relationshipLabelFactory } from './Input'
import { Breadcrumbs } from './Breadcrumbs'
import { isAutoFocusInput } from '../input/index'
import { skipOverride } from '../Utils'

const getFieldErrorCreate = ({ formStack, stackIndex, fieldName }) => (
  R.path(['stack', stackIndex, 'errors', fieldName], formStack)
)

export const makeCreateLabel = ({ schema, modelName, fieldName, customProps }) => {
  const type = R.prop('type', schema.getField(modelName, fieldName))
  if (R.type(type) !== 'Object') {
    return null
  }
  const actions = schema.getActions(modelName)
  const onStackCreate = R.path(['create', 'onStackCreate'], actions)
  const targetModel = R.path(['type', 'target'], schema.getField(modelName, fieldName))

  const onClick = () => onStackCreate({ modelName: targetModel })

  const CreateLabel = relationshipLabelFactory({ schema, modelName, fieldName, onClick, customProps })
  return CreateLabel
}

const getDisabledValue = ({ schema, modelName, fieldName, form }) => {
  const type = schema.getType(modelName, fieldName)

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form)
  } else {
    return R.path(['fields', fieldName, 'label'], form)
  }
}

export const DefaultCreateTitle = ({ schema, modelName, customProps }) => {
  return (
    <h1>Create {schema.getModelLabel({ modelName, customProps })}</h1>
  )
}

export const DefaultCreatePage = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  customProps
}) => {
  const stackIndex = R.prop('index', formStack)
  const originFieldName = R.prop('originFieldName', formStack)
  const stack = R.prop('stack', formStack)
  const form = R.prop(stackIndex, stack)

  const origin = R.prop('originModelName', formStack)
  const fieldOrder = schema.getCreateFields({ modelName, customProps })
  if (origin && stackIndex === 0) {
    const index = fieldOrder.indexOf(originFieldName)
    if (index !== -1) {
      fieldOrder.splice(index, 1)
    }
    fieldOrder.splice(0, 0, originFieldName)
  }

  const actions = schema.getActions(modelName)
  const onChange = R.path(['create', 'onInputChange'], actions)
  const onCancel = R.path(['create', 'onCancel'], actions)
  const onSave = R.path(['create', 'onSave'], actions)
  const disableButtons = stackIndex !== stack.length - 1
  let autoFocusAdded = false

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      return onSave({ modelName })
    }
  }
  return (
    <React.Fragment>
      <div>* Indicates a Required Field</div>
      <br />
      <div>
        {fieldOrder.map(fieldName => {
          if (schema.shouldDisplayCreate({ modelName, fieldName, customProps }) === false) {
              return null
          }

          const disabled = schema.isFieldDisabled({
            modelName,
            fieldName,
            formStack,
            customProps
          })
          const value = disabled
            ? getDisabledValue({ schema, modelName, fieldName, form })
            : R.path(['fields', fieldName], form)
          const error = getFieldErrorCreate({
            formStack,
            stackIndex,
            fieldName
          })
          let autoFocus = false
          if (
            !autoFocusAdded &&
            isAutoFocusInput(schema.getType(modelName, fieldName))
          ) {
            autoFocus = true
            autoFocusAdded = true
          }
          return (
            <div className='mb-3' key={`defaultCreatePage-${fieldName}`}>
              <Input
                {...{
                  schema,
                  modelName,
                  fieldName,
                  value,
                  error,
                  selectOptions,
                  onChange,
                  disabled,
                  formStack,
                  customLabel: makeCreateLabel({
                    schema,
                    modelName,
                    fieldName,
                    customProps
                  }),
                  autoFocus,
                  onKeyDown,
                  customProps
                }}
              />
            </div>
          )
        })}
      </div>
      {disableButtons && (
        <p className='text-danger'>
          Cannot save or cancel until all subsequent creates are resolved.
        </p>
      )}
      <div className='btn-group mt-2 mb-3'>
        <button
          className='btn btn-success'
          role='button'
          onClick={() => onSave({ modelName })}
          disabled={disableButtons}
        >
          Submit
        </button>
        <button
          className='btn'
          role='button'
          onClick={() => onCancel()}
          disabled={disableButtons}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  )
}

export const DefaultCreate = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  customProps
}) => {
  const CreateTitleOverride = schema.getCreateTitleOverride(modelName)
  const CreatePageOverride = schema.getCreatePageOverride(modelName)

  const CreateTitle = CreateTitleOverride || DefaultCreateTitle
  const CreatePage = CreatePageOverride || DefaultCreatePage

  if (skipOverride(CreateTitleOverride) && skipOverride(CreatePageOverride)) {
    return null
  }

  return (
    <div className='container'>
      <Breadcrumbs
        schema={schema}
        formStack={formStack}
        customProps={customProps}
      />
      {skipOverride(CreateTitleOverride) ? null : (
        <CreateTitle
          {...{
            schema,
            modelName,
            customProps
          }}
        />
      )}
      {skipOverride(CreatePageOverride) ? null : (
        <CreatePage
          {...{
            schema,
            modelName,
            formStack,
            selectOptions,
            customProps
          }}
        />
      )}
    </div>
  )
}

const Create = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  customProps
}) => {
  const CreateOverride = schema.getCreateOverride(modelName)

  const CreateComponent = CreateOverride || DefaultCreate

  if (R.prop('index', formStack) === -1) {
    return <Redirect to={R.propOr('/', 'originPath', formStack)} />
  }

  return skipOverride(CreateOverride) ? null : (
    <CreateComponent
      {...{ schema, modelName, formStack, selectOptions, customProps }}
    />
  )
}

export default Create
