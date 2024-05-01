import { ComponentProps } from 'react';

import { useTable } from './useTable';

export interface TableFallbackProps
  extends ComponentProps<"tbody"> {
}

export const TableFallback = ({
  children,
  ...props
}: TableFallbackProps) => {
  const {
    selected: { columnIds, data },
  } = useTable((state) => ({
    columnIds: state.columnIds,
    data: state.data,
  }));

  const cellContent = data ? (
    'No Records Found.'
  ) : (
    <div className='flex justify-center'>
      <div className='animate-spin rounded-[50%] border-[--fg-accent] border-t-[--text-color] border-y-4 border-x-4 h-[30px] w-[30px]'></div>
    </div>
  );

  return (!data || data.length === 0) && columnIds.length > 0 ? (
    <tbody {...props}>
      <tr>
        <td colSpan={columnIds.length}>
          {children === undefined ? cellContent : children}
        </td>
      </tr>
    </tbody>
  ) : null;
};
