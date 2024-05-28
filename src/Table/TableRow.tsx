import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slots } from '@/Slots';

import { TableCell } from './TableCell';
import { useTableStore } from './useTableStore';

export interface TableRowProps extends ComponentProps<'tr'> {
  prefilled?: boolean;
}

export const TableRow = ({
  prefilled,
  children,
  className,
  ...props
}: TableRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  return (
    // group className used for row highlighting on hover
    <tr className={twMerge('group', className)} {...props}>
      <Slots slotOrder={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId: string) => {
              return <TableCell key={columnId} columnId={columnId} />;
            })}
            {children}
          </>
        ) : (
          children
        )}
      </Slots>
    </tr>
  );
};
