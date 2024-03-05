import { useContext, Fragment, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import LoadingButtonGroup from '../commons/LoadingButtonGroup';
import {
  DisplayModeContext,
  DisplayMode,
} from '../../contexts/commons/DisplayModeContext';
import { LoadingContext } from '../../contexts/commons/LoadingContext';
import { PACKAGE_ABBR } from '../../package';
import { BaseProps } from '../../types';

interface ModelFormCrudProps extends BaseProps {
  onSave?: (payload?: any) => void;
  onDelete?: (payload?: any) => void;
  onEdit?: () => void;
  onCancel?: () => void;
  editable?: boolean;
  deletable?: boolean;
  size?: 'sm' | 'lg';
  icons?: boolean;
  message?: string;
}

const ModelFormCrud = ({
  id,
  className = '',
  onSave = () => {},
  onDelete = () => {},
  onEdit,
  onCancel,
  editable,
  deletable,
  size,
  icons,
  message,
}: ModelFormCrudProps) => {
  const showCrud = editable || deletable;
  const { mode, setMode } = useContext(DisplayModeContext);
  const { loading } = useContext(LoadingContext);
  const { handleSubmit, formState, reset } = useFormContext();
  const onEditHandler = onEdit ?? (() => setMode(DisplayMode.EDIT));
  const onCancelHandler =
    onCancel ??
    (() => {
      reset();
      setMode(DisplayMode.DISPLAY);
    });

  const onSaveDirtyFieldsHandler = (formValues: Record<string, any>) => {
    const dirtyFields = { ...formState.dirtyFields };
    Object.keys(dirtyFields).forEach((dirtyField) => {
      dirtyFields[dirtyField] = formValues[dirtyField];
    });
    onSave(dirtyFields);
    onCancelHandler();
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return showCrud ? (
    <div id={id} className={`${PACKAGE_ABBR}-model-form-crud ${className}`}>
      <LoadingButtonGroup loading={loading} variant='outline' size={size}>
        {mode === DisplayMode.DISPLAY ? (
          <Fragment key={`${PACKAGE_ABBR}-form-crud-display`}>
            {editable && (
              <Button onClick={onEditHandler} variant='outline-primary'>
                {icons ? <FaEdit /> : 'Edit'}
              </Button>
            )}
            {deletable && (
              <>
                <Button onClick={handleShow} variant='outline-danger'>
                  {icons ? <FaRegTrashAlt /> : 'Delete'}
                </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{message}</Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDelete}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Fragment>
        ) : (
          <Fragment key={`${PACKAGE_ABBR}-form-crud-edit`}>
            <Button
              type='submit'
              onClick={handleSubmit(onSaveDirtyFieldsHandler)}
              variant='outline-success'
              disabled={Object.keys(formState.errors).length > 0}
            >
              {icons ? <FaRegSave /> : 'Save'}
            </Button>
            <Button onClick={onCancelHandler} variant='outline-primary'>
              {icons ? <FaRegTimesCircle /> : 'Cancel'}
            </Button>
          </Fragment>
        )}
      </LoadingButtonGroup>{' '}
    </div>
  ) : null;
};

export default ModelFormCrud;
