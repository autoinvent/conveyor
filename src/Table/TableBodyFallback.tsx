import { HTMLAttributes } from 'react';

import { useTable } from './useTable';

export interface TableBodyFallbackProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBodyFallback = ({
  children,
  ...props
}: TableBodyFallbackProps) => {
  const {
    selected: { colSpan, data },
  } = useTable((state) => ({
    colSpan: state.columnIds.length,
    data: state.data,
  }));

  return data.length === 0 ? (
    <tbody {...props}>
      <tr>
        <td colSpan={colSpan}>
          {children === undefined ? 'No Records Found.' : children}
        </td>
      </tr>
    </tbody>
  ) : null;
};
