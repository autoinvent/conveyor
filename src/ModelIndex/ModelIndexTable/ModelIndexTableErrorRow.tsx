import type { ComponentProps } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { ErrorMessage } from '@hookform/error-message';

import { useTableStore } from '@/Table';

import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableErrorRowProps extends ComponentProps<'tr'> {
  errors: FieldErrors;
}

export const ModelIndexTableErrorRow = ({
  errors,
  className,
}: ModelIndexTableErrorRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);

  return Object.keys(errors).length ? (
    <tr className={twMerge('danger', className)}>
      {fieldNames.map((fieldName) => {
        return fieldName === ACTION_COLUMN ? (
          <td key={ACTION_COLUMN} />
        ) : (
          <td key={fieldName} className="danger border px-3">
            <ErrorMessage errors={errors} name={fieldName} />
          </td>
        );
      })}
    </tr>
  ) : null;
};
