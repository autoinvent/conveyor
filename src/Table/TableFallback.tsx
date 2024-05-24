import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useTable } from './useTable';

export interface TableFallbackProps extends ComponentProps<'tbody'> {}

export const TableFallback = ({
  className,
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
    <div className="flex justify-center">
      <div className="animate-spin rounded-[50%] border-[--fg-accent] border-t-[--text-color] border-y-4 border-x-4 h-[30px] w-[30px]"></div>
    </div>
  );

  return (!data || data.length === 0) && columnIds.length > 0 ? (
    <tbody className={twMerge('rounded', className)} {...props}>
      <tr className="items-center group rounded cursor-default">
        <td
          className="text-center bg-[--fg-color] border border-solid group-hover:bg-[--fg-accent] border-[--border-color]"
          colSpan={columnIds.length}
        >
          {children === undefined ? cellContent : children}
        </td>
      </tr>
    </tbody>
  ) : null;
};
