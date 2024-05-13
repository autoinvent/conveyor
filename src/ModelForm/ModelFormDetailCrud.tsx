import { useFormContext } from 'react-hook-form';

import { Lens, DataLens, useLenses } from '@/Lenses';

import { useModelForm } from './useModelForm';

export const ModelFormDetailCrud = () => {
  const {
    selected: { onCancel, onDelete, showActions },
  } = useModelForm((state) => ({
    showActions: state.showActions,
    onCancel: state.onCancel,
    onDelete: state.onDelete
  }));
  const { reset } = useFormContext();
  const { setLens } = useLenses();

  const onCancelEdit = () => {
    reset();
    setLens(DataLens.DISPLAY);
    onCancel?.();
  };

  return showActions ? (
    <>
      <Lens lens={DataLens.DISPLAY}>
        <button
          className="bg-[--primary] rounded-l-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark]"
          type="button"
          onClick={() => setLens(DataLens.EDITING)}
        >
          Edit
        </button>
        <button
          className="bg-[--danger] rounded-r-md border-[--danger] hover:bg-[--danger-dark] hover:border-[--danger-dark]"
          type="button"
          onClick={() => {
            onDelete?.()
          }}
        >
          Delete
        </button>
      </Lens>
      <Lens lens={DataLens.EDITING}>
        <button
          className="bg-[--success] rounded-l-md border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark]"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-[--primary] rounded-r-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark]"
          type="button"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      </Lens>
    </>
  ) : null;
};
