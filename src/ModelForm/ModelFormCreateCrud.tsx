import { Lens, DataLens } from '@/Lenses';

import { useModelForm } from './useModelForm';

export const ModelFormCreateCrud = () => {
  const {
    selected: { onCancel, showActions },
  } = useModelForm((state) => ({
    showActions: state.showActions,
    onCancel: state.onCancel,
  }));
  return showActions ? (
    <>
      <Lens lens={DataLens.EDITING}>
        <button
          className="bg-[--success] rounded-l-md border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark] my-6"
          type="submit"
        >
          Create
        </button>
        <button
          className="bg-[--primary] rounded-r-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark] my-6"
          type="button"
          onClick={() => onCancel?.()}
        >
          Cancel
        </button>
      </Lens>
    </>
  ) : null;
};
