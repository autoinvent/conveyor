import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ErrorMessage } from '@hookform/error-message';

import { useTableStore } from '@/Table';

import { useFormStore } from '@/Form';
import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableErrorRowProps extends ComponentProps<'tr'> {}

export const ModelIndexTableErrorRow = ({
  className,
  ...htmlProps
}: ModelIndexTableErrorRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const errors = useFormStore((state) => state.formState.errors);
  return errors && Object.keys(errors).length ? (
    <tr className={twMerge('danger', className)} {...htmlProps}>
      {fieldNames.map((fieldName) => {
        return fieldName === ACTION_COLUMN ? (
          <td className="border" key={ACTION_COLUMN} />
        ) : (
          <td key={fieldName} className="border px-3">
            <ErrorMessage errors={errors} name={fieldName} />
          </td>
        );
      })}
    </tr>
  ) : null;
};
