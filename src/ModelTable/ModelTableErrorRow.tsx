import type { ComponentProps } from 'react';

import { FormError, useFormStore } from '@/Form';
import { TableCell, TableRow } from '@/lib/components/ui/table';
import { cn } from '@/lib/utils';

import { useModelTableStore } from './useModelTableStore';

export interface ModelTableErrorRowProps
  extends ComponentProps<typeof TableRow> {}

export const ModelTableErrorRow = ({
  className,
  ...tableRowProps
}: ModelTableErrorRowProps) => {
  const fieldOrder = useModelTableStore(
    (state) => state.tableOptions.fieldOrder,
  );
  const readOnly = useModelTableStore((state) => state.tableOptions.readOnly);
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
        {fieldOrder.map((field) => {
          return (
            <TableCell key={field}>
              <FormError name={field} />
            </TableCell>
          );
        })}
        {!readOnly && <TableCell />}
      </TableRow>
    )
  );
};
