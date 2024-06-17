import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

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
      <tr className={twMerge('danger', className)} {...htmlProps}>
        {fieldNames.map((fieldName) => {
          return fieldName === ACTION_COLUMN ? (
            <td className="border" key={ACTION_COLUMN} />
          ) : (
            <td key={fieldName} className="border px-3">
              <FormError name={fieldName} />
            </td>
          );
        })}
      </tr>
    )
  );
};
