import { LoaderCircle } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { DataLens, type DataType } from '@/types';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormActionsProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export const ModelFormActions = ({
  className,
  children,
}: ModelFormActionsProps) => {
  const setLens = useLensesStore((state) => state.setLens);
  const defaultValues = useFormStore((state) => state.formState.defaultValues);
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const fields = useModelFormStore((state) => state.fields);
  const readOnly = useModelFormStore((state) => state.readOnly);
  const onCreate = useModelFormStore((state) => state.onCreate);
  const onUpdate = useModelFormStore((state) => state.onUpdate);
  const onDelete = useModelFormStore((state) => state.onDelete);
  const onEdit = useModelFormStore((state) => state.onEdit);
  const onCancelEdit = useModelFormStore((state) => state.onCancelEdit);
  const onSave = onCreate ?? onUpdate;

  const onEditHandler = () => setLens(DataLens.INPUT);
  const onCancelEditHandler = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };
  const onSaveHandler = handleSubmit(async (formData: DataType) => {
    const changedData = Object.fromEntries(
      Object.entries(formData).filter((entry) => dirtyFields[entry[0]]),
    );
    await onSave?.({
      data: { ...defaultValues },
      changedData,
      onEdit: onEditHandler,
      onCancelEdit: onCancelEditHandler,
    });
  });
  const onDeleteHandler = handleSubmit(async () => {
    await onDelete?.({
      data: { ...defaultValues },
      changedData: {},
      onEdit: onEditHandler,
      onCancelEdit: onCancelEditHandler,
    });
  });

  return (
    !readOnly &&
    fields.length > 0 && (
      <div className={cn('space-x-4 whitespace-nowrap', className)}>
        {children === undefined ? (
          <>
            <Lens lens={!isSubmitting && DataLens.DISPLAY}>
              {onUpdate && (
                <Button
                  onClick={() =>
                    onEdit ? onEdit({ onEdit: onEditHandler }) : onEditHandler()
                  }
                  onKeyUp={(e) =>
                    e.key === 'Enter' &&
                    (onEdit
                      ? onEdit({ onEdit: onEditHandler })
                      : onEditHandler())
                  }
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  onClick={onDeleteHandler}
                  onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
                >
                  Delete
                </Button>
              )}
            </Lens>
            <Lens lens={!isSubmitting && DataLens.INPUT}>
              {onSave && (
                <Button
                  onClick={onSaveHandler}
                  onKeyUp={(e) => e.key === 'Enter' && onSaveHandler()}
                >
                  {onCreate ? 'Create' : 'Save'}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() =>
                  onCancelEdit
                    ? onCancelEdit({ onCancelEdit: onCancelEditHandler })
                    : onCancelEditHandler()
                }
                onKeyUp={(e) =>
                  e.key === 'Enter' &&
                  (onCancelEdit
                    ? onCancelEdit({ onCancelEdit: onCancelEditHandler })
                    : onCancelEditHandler())
                }
              >
                Cancel
              </Button>
            </Lens>
            {isSubmitting && (
              <Button variant="ghost" className="w-36">
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </>
        ) : (
          children
        )}
      </div>
    )
  );
};
