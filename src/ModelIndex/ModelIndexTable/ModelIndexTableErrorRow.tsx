import type { ComponentProps } from 'react';

import {
  TableCell as STableCell,
  TableRow as STableRow,
} from '@/lib/components/ui/table';
import { cn } from '@/lib/utils';

import { useTableStore } from '@/Table';

import { FormError, useFormStore } from '@/Form';
import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableErrorRowProps extends ComponentProps<'tr'> {}

export const ModelIndexTableErrorRow = ({
  className,
  ...htmlProps
}: ModelIndexTableErrorRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const errors = useFormStore((state) => state.formState.errors);
  const hasErrorMessage = Object.keys(errors).some(
    (fieldName) => errors[fieldName]?.message,
  );
  return (
    hasErrorMessage &&
    Object.keys(errors).length > 0 && (
      <STableRow
        className={cn(
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          className,
        )}
        {...htmlProps}
      >
        {fieldNames.map((fieldName) => {
          return fieldName === ACTION_COLUMN ? (
            <STableCell key={ACTION_COLUMN} />
          ) : (
            <STableCell key={fieldName}>
              <FormError name={fieldName} />
            </STableCell>
          );
        })}
      </STableRow>
    )
  );
};
