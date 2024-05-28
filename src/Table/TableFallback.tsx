import type { ComponentProps } from 'react';

import { useTableStore } from './useTableStore';

export interface TableFallbackProps extends ComponentProps<'tbody'> {}

export const TableFallback = ({
  className,
  children,
  ...props
}: TableFallbackProps) => {
  const { columnIds, data } = useTableStore();

  const cellContent = (
    <div className="flex justify-center">
      {data ? (
        'No Records Found.'
      ) : (
        <div className="h-[30px] w-[30px] animate-spin rounded-[50%] border-[--fg-accent] border-x-4 border-y-4 border-t-[--text-color]" />
      )}
    </div>
  );

  return (!data || data.length === 0) && columnIds.length > 0 ? (
    <tbody className={className} {...props}>
      <tr>
        <td
          className="border border-[--border-color] bg-[--fg-color] p-1.5"
          colSpan={columnIds.length}
        >
          {children === undefined ? cellContent : children}
        </td>
      </tr>
    </tbody>
  ) : null;
};
