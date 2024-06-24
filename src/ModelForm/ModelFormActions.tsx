import type { ComponentProps } from 'react';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner, useLoadingStore } from '@/Loading';
import { DataLens, type DataType } from '@/types';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormActionsProps extends ComponentProps<'div'> {}

export const ModelFormActions = ({ className }: ModelFormActionsProps) => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelFormStore((state) => state.showActions);
  const onCreate = useModelFormStore((state) => state.onCreate);
  const onUpdate = useModelFormStore((state) => state.onUpdate);
  const onDelete = useModelFormStore((state) => state.onDelete);
  const onEdit = useModelFormStore((state) => state.onEdit);
  const onCancelEdit = useModelFormStore((state) => state.onCancelEdit);
  const onSave = onCreate ?? onUpdate;
  const data = useModelFormStore((state) => state.data);
  const fields = useModelFormStore((state) => state.fields);

  const onEditHandler = () => {
    const onEditMiddleware = () => setLens(DataLens.INPUT);
    onEdit ? onEdit(onEditMiddleware) : onEditMiddleware();
  };
  const onCancelEditHandler = () => {
    const onCancelEditMiddleware = () => {
      setLens(DataLens.VALUE);
      reset();
    };
    onCancelEdit
      ? onCancelEdit(onCancelEditMiddleware)
      : onCancelEditMiddleware();
  };
  const onDeleteHandler = async () => {
    onDelete && setIsLoading(true);
    await onDelete?.(data);
    setIsLoading(false);
  };

  const onSubmit = async (formData: DataType) => {
    onSave && setIsLoading(true);
    await onSave?.({ data: formData, dirtyFields });
    setIsLoading(false);
    onCancelEditHandler()
  };

  return (
    showActions &&
    fields.length > 0 &&
    data && (
      <div className={cn('flex justify-center', className)}>
        <Lens lens={!isLoading && DataLens.VALUE}>
          <Button
            onClick={onEditHandler}
            onKeyUp={(e) => e.key === 'Enter' && onEditHandler()}
            variant="outline"
          >
            Edit
          </Button>
          {!onCreate && onDelete && (
            <Button
              onClick={onDeleteHandler}
              onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
              variant="outline-destructive"
            >
              Delete
            </Button>
          )}
        </Lens>
        <Lens lens={!isLoading && DataLens.INPUT}>
          {onSave && (
            <Button type="submit" variant="outline-success" onClick={handleSubmit(onSubmit)}>
              {onCreate ? 'Create' : 'Save'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onCancelEditHandler}
            onKeyUp={(e) => e.key === 'Enter' && onCancelEditHandler()}
          >
            Cancel
          </Button>
        </Lens>
        {isLoading && <Spinner />}
      </div>
    )
  );
};
