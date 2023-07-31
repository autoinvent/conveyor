import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa'

import LoadingButtonGroup from '../commons/LoadingButtonGroup'
import {
  DisplayModeContext,
  DisplayMode,
} from '../../contexts/commons/DisplayModeContext'
import { LoadingContext } from '../../contexts/commons/LoadingContext'
import { BaseProps } from '../../types'

interface ModelFormCrudProps extends BaseProps {
  onSave?: (payload?: any) => void
  onDelete?: (payload?: any) => void
  onEdit?: () => void
  onCancel?: () => void
  editable?: boolean
  deletable?: boolean
  size?: 'sm' | 'lg'
  icons?: boolean
}

const ModelFormCrud = ({
  id,
  className,
  onSave = () => {},
  onDelete = () => {},
  onEdit,
  onCancel,
  editable,
  deletable,
  size,
  icons,
}: ModelFormCrudProps) => {
  const showCrud = editable || deletable
  const { mode, setMode } = useContext(DisplayModeContext)
  const { loading } = useContext(LoadingContext)
  const { handleSubmit, formState, reset } = useFormContext()
  const onEditHandler = onEdit ?? (() => setMode(DisplayMode.EDIT))
  const onCancelHandler =
    onCancel ??
    (() => {
      reset()
      setMode(DisplayMode.DISPLAY)
    })

  const onSaveDirtyFieldsHandler = (formValues: Record<string, any>) => {
    const dirtyFields = { ...formState.dirtyFields }
    Object.keys(dirtyFields).forEach((dirtyField) => {
      dirtyFields[dirtyField] = formValues[dirtyField]
    })
    onSave(dirtyFields)
  }

  return showCrud ? (
    <LoadingButtonGroup
      id={id}
      className={className}
      loading={loading}
      variant="outline"
      size={size}
    >
      {mode === DisplayMode.DISPLAY ? (
        <>
          {editable && (
            <Button
              key="onEdit"
              onClick={onEditHandler}
              variant="outline-primary"
            >
              {icons ? <FaEdit /> : 'Edit'}
            </Button>
          )}
          {deletable && (
            <Button key="onDelete" onClick={onDelete} variant="outline-danger">
              {icons ? <FaRegTrashAlt /> : 'Delete'}
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            key="onSubmit"
            onClick={handleSubmit(onSaveDirtyFieldsHandler)}
            variant="outline-success"
            disabled={Object.keys(formState.errors).length > 0}
          >
            {icons ? <FaRegSave /> : 'Save'}
          </Button>
          <Button
            key="onCancel"
            onClick={onCancelHandler}
            variant="outline-primary"
          >
            {icons ? <FaRegTimesCircle /> : 'Cancel'}
          </Button>
        </>
      )}
    </LoadingButtonGroup>
  ) : null
}

export default ModelFormCrud
