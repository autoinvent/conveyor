import { useFormContext } from 'react-hook-form';

import { Lens, DataLens, useLenses } from '@/Lenses';

import { useModelForm } from './useModelForm';

export const ModelFormDetailCrud = () => {
  const {
    selected: { onCancel, showActions },
  } = useModelForm((state) => ({
    showActions: state.showActions,
    onCancel: state.onCancel,
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
          className="bg-[--success] rounded-l-md border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark] my-6"
          type="button"
          onClick={() => setLens(DataLens.EDITING)}
        >
          Edit
        </button>
        <button
          className="bg-[--primary] rounded-r-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark] my-6"
          type="button"
          onClick={onCancelEdit}
        >
          Delete
        </button>
      </Lens>
      <Lens lens={DataLens.EDITING}>
        <button
          className="bg-[--success] rounded-l-md border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark] my-6"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-[--primary] rounded-r-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark] my-6"
          type="button"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      </Lens>
    </>
  ) : null;
};
