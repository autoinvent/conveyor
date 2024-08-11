import { Save, SquarePen, Trash2, X } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType } from '@/types';

import { ACTION_COLUMN } from './ModelTable';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelTableActionCell = ({
  children,
  className,
  ...tableCellProps
}: ModelTableActionCellProps) => {
  const setLens = useLensesStore((state) => state.setLens);
  const data = useFormStore((state) => state.formState.defaultValues);
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onUpdate = useModelTableStore((state) => state.onUpdate);
  const onDelete = useModelTableStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };
  const onSave = async (formData: DataType) => {
    await onUpdate?.({ data: formData, dirtyFields });
    onCancelEdit();
  };
  const onDeleteHandler = async () => {
    await onDelete?.({ ...data });
  };

  return (
    <TableCell
      className={cn('w-0', className)}
      columnId={ACTION_COLUMN}
      {...tableCellProps}
    >
      {children === undefined ? (
        <form
          className="flex h-full items-center justify-center whitespace-nowrap"
          onSubmit={handleSubmit(onSave)}
        >
          <div className="space-x-1">
            <Lens lens={DataLens.DISPLAY}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                onKeyUp={(e) => e.key === 'Enter' && onEdit()}
              >
                <SquarePen className="h-4 w-4" />
              </Button>
              {onDelete && (
                <Button
                  variant="ghost-destructive"
                  size="icon"
                  onClick={onDeleteHandler}
                  onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </Lens>
            <Lens lens={!isSubmitting && DataLens.INPUT}>
              {onUpdate && (
                <Button type="submit" variant="ghost-success" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onCancelEdit}
                onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
              >
                <X className="h-4 w-4" />
              </Button>
            </Lens>
            {isSubmitting && <Spinner />}
          </div>
        </form>
      ) : (
        children
      )}
    </TableCell>
  );
};
