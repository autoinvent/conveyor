import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ErrorMessage } from '@hookform/error-message';

import { useTableStore } from '@/Table';

import { ACTION_COLUMN } from './constants';
import { useFormStore } from '@/Form';

export interface ModelIndexTableErrorRowProps extends ComponentProps<'tr'> {}

export const ModelIndexTableErrorRow = ({
  className,
  ...htmlProps
}: ModelIndexTableErrorRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const { errors } = useFormStore((state) => state.formState);

  return Object.keys(errors).length ? (
    <tr className={twMerge('danger', className)} {...htmlProps}>
      {fieldNames.map((fieldName) => {
        return fieldName === ACTION_COLUMN ? (
          <td key={ACTION_COLUMN} />
        ) : (
          <td key={fieldName} className="border px-3">
            <ErrorMessage errors={errors} name={fieldName} />
          </td>
        );
      })}
    </tr>
  ) : null;
};
