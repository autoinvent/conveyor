import { useFormStore } from '@/Form';
import { DataLens, type DataType } from '@/types';
import { useLensesStore } from '@/Lenses';
import type { ActionParams } from './ActionContext';

export const useGetActionParams = <D extends DataType>(): ((
  formValues: D,
) => ActionParams<D>) => {
  const setLens = useLensesStore((state) => state.setLens);

  const defaultValues = useFormStore(
    (state) => state.formState.defaultValues as D,
  );
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const reset = useFormStore((state) => state.reset);

  const getChangedData = (formValues: D) =>
    Object.fromEntries(
      Object.entries(formValues).filter((entry) => dirtyFields[entry[0]]),
    ) as D;
  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };

  return (formValues) => ({
    data: { ...defaultValues },
    changedData: getChangedData(formValues),
    onEdit,
    onCancelEdit,
  });
};
