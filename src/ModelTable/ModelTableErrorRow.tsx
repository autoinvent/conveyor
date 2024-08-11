import type { ComponentProps } from 'react';
import { ErrorMessage } from '@hookform/error-message';

import { useFormStore } from '@/Form';
import { useTableStore } from '@/Table';
import { TableCell, TableRow } from '@/lib/components/ui/table';
import { cn } from '@/lib/utils';

export interface ModelTableErrorRowProps
  extends ComponentProps<typeof TableRow> {}

export const ModelTableErrorRow = ({
  className,
  ...tableRowProps
}: ModelTableErrorRowProps) => {
  const fields = useTableStore((state) => state.columnIds);
  const errors = useFormStore((state) => state.formState.errors);
  const hasErrorMessage = Object.keys(errors).some(
    (fieldName) => errors[fieldName]?.message,
  );
  return (
    hasErrorMessage && (
      <TableRow
        className={cn(
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          className,
        )}
        {...tableRowProps}
      >
        {fields.map((field) => {
          return (
            <TableCell key={field}>
              <ErrorMessage name={field} />
            </TableCell>
          );
        })}
      </TableRow>
    )
  );
};
