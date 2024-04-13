import { HTMLAttributes } from 'react'

import { useTable } from './useTable';

export interface TableBodyFallbackProps extends HTMLAttributes<HTMLTableSectionElement> { }

export const TableBodyFallback = ({ children, ...props }: TableBodyFallbackProps) => {
  const { table: colSpan } = useTable((state) => state.columnIds.length,);
  return (
    <tbody {...props}>
      <tr>
        <td colSpan={colSpan}>
          {children === undefined ? 'No Records Found.' : children}
        </td>
      </tr>
    </tbody>
  );
};
