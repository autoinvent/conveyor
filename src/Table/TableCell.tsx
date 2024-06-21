import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDataStore } from '@/Data';
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
  const data = useDataStore((state) => state[columnId]);
  const display = typeof data === 'object' ? JSON.stringify(data) : data;
  return (
    <Slot slotKey={columnId}>
      <td
        className={twMerge(
          'h-full border border-border px-2.5 py-1.5 group-hover:bg-accent-foreground',
          className,
        )}
        {...props}
      >
        {children === undefined ? display : children}
      </td>
    </Slot>
  );
};
