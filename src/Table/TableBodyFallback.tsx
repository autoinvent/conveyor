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

  const cellContent = data ? (
    'No Records Found.'
  ) : (
    <div className='flex justify-center'>
      <div className='animate-spin rounded-[50%] border-[--fg-accent] border-t-[--text-color] border-y-4 border-x-4 h-[30px] w-[30px]'></div>
    </div>
  );

  return !data || data.length === 0 ? (
    <tbody {...props}>
      <tr>
        <td colSpan={colSpan}>
          {children === undefined ? cellContent : children}
        </td>
      </tr>
    </tbody>
  ) : null;
};
