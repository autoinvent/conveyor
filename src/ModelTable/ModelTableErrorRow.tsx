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
  const renderedFields = useModelTableStore(
    (state) => state.tableOptions?.fieldOrder ?? state.fields,
  );
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
        {renderedFields.map((field) => {
          // return fieldName === ACTION_COLUMN ? (
          //   <TableCell key={ACTION_COLUMN} />
          // ) : (
          return (
            <TableCell key={field}>
              <FormError name={field} />
            </TableCell>
          );
        })}
      </TableRow>
    )
  );
};
