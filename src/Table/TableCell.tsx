import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useData } from '@/Data';
import { Slot } from '@/Slots';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  columnId: string;
}

export const TableCell = ({ columnId, children, className, ...props }: TableCellProps) => {
  const { data } = useData((state) => state.original);
  const columnData = data[columnId];
  const displayData =
    typeof columnData === 'object' ? JSON.stringify(columnData) : columnData;
  return (
    <Slot slot={columnId}>
      <td className={twMerge('text-center bg-[--fg-color] border border-solid group-hover:bg-[--fg-accent] border-[--border-color]', className)} {...props}>
        {children === undefined ? displayData : children}
      </td>
    </Slot>
  );
};
