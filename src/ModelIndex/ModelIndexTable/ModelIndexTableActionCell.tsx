import {
  TrashIcon,
  Pencil2Icon,
  EnterIcon,
  ExitIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { useDataStore } from '@/Data';
import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner, useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type DataType } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelIndexTableActionCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const data = useDataStore();
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelIndexStore((state) => state.showActions);
  const onUpdate = useModelIndexStore((state) => state.onUpdate);
  const onDelete = useModelIndexStore((state) => state.onDelete);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onSave = async (formData: DataType) => {
    onUpdate && setIsLoading(true);
    await onUpdate?.({ data: formData, dirtyFields });
    setIsLoading(false);
  };
  const onDeleteHandler = async () => {
    onDelete && setIsLoading(true);
    await onDelete?.(data);
    setIsLoading(false);
  };

  return (
    showActions && (
      <TableCell
        className={cn('w-0 p-0', className)}
        columnId={ACTION_COLUMN}
        {...props}
      >
        {children === undefined ? (
          <form
            className="flex h-full items-center justify-center whitespace-nowrap"
            onSubmit={handleSubmit(onSave)}
          >
            <Lens lens={!isLoading && DataLens.VALUE}>
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                onKeyUp={(e) => e.key === 'Enter' && onEdit()}
              >
                <EnterIcon />
              </Button>
              {onDelete && (
                <Button
                  variant="outline-destructive"
                  size="icon"
                  onClick={onDeleteHandler}
                  onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
                >
                  <TrashIcon />
                </Button>
              )}
            </Lens>
            <Lens lens={!isLoading && DataLens.INPUT}>
              {onUpdate && (
                <Button type="submit" variant="outline-success" size="icon">
                  <Pencil2Icon />
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={onCancelEdit}
                onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
              >
                <ExitIcon />
              </Button>
            </Lens>
            {isLoading && <Spinner />}
          </form>
        ) : (
          children
        )}
      </TableCell>
    )
  );
};
