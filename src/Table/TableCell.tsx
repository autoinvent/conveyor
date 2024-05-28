import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useData } from '@/Data';
import { Slot } from '@/Slots';

export interface TableCellProps extends ComponentProps<'td'> {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  className,
  ...props
}: TableCellProps) => {
  const data = useData();
  const columnData = data[columnId];
  const displayData =
    typeof columnData === 'object' ? JSON.stringify(columnData) : columnData;
  return (
    <Slot slot={columnId}>
      <td
        className={twMerge(
          'border border-[--border-color] bg-[--fg-color] p-1.5 group-hover:bg-[--fg-accent]',
          className,
        )}
        {...props}
      >
        {children === undefined ? displayData : children}
      </td>
    </Slot>
  );
};
