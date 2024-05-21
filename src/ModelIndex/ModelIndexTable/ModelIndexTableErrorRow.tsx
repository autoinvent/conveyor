import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { useTable } from '@/Table';
import { ACTION_SLOT } from './constants';

export const ModelIndexTableErrorRow = () => {
  const { selected: columnIds } = useTable((state) => state.columnIds);

  const {
    formState: { errors },
  } = useFormContext();

  return Object.keys(errors).length ? (
    <tr className="danger">
      {columnIds.map((columnId: string) => {
        if (columnId === ACTION_SLOT) {
          return <td key={ACTION_SLOT}></td>;
        }
        return (
          <td key={columnId}>
            <ErrorMessage errors={errors} name={columnId} />
          </td>
        );
      })}
    </tr>
  ) : null;
};
