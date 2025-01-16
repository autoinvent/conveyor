import { LoaderCircle } from 'lucide-react';

import { useFormStore } from '@/Form';
import { Lens } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { DataLens } from '@/types';

import { ACTION_COLUMN } from './ModelTable';
import { DeleteAction } from '@/Actions/DeleteAction';
import { SubmitAction } from '@/Actions/SubmitAction';
import { CancelEditAction } from '@/Actions/CancelEditAction';
import { EditAction } from '@/Actions/EditAction';

export interface ModelTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelTableActionCell = ({
  children,
  className,
  ...tableCellProps
}: ModelTableActionCellProps) => {
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);

  return (
    <TableCell
      className={cn('sticky right-0 w-0 bg-inherit shadow-left', className)}
      columnId={ACTION_COLUMN}
      {...tableCellProps}
    >
      {children === undefined ? (
        <div className="space-x-1 whitespace-nowrap">
          <Lens lens={!isSubmitting && DataLens.DISPLAY}>
            <EditAction size="icon" />
            <DeleteAction size="icon" />
          </Lens>
          <Lens lens={!isSubmitting && DataLens.INPUT}>
            <SubmitAction size="icon" />
            <CancelEditAction size="icon" />
          </Lens>
          {isSubmitting && (
            <Button variant="ghost" size="icon" className="w-full">
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
      ) : (
        children
      )}
    </TableCell>
  );
};
