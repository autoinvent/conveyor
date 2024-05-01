import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slots } from '@/Slots';

import { TableCell } from './TableCell';
import { useTable } from './useTable';

export interface TableRowProps extends ComponentProps<"tr"> {
  prefilled?: boolean;
}

export const TableRow = ({ prefilled, children, className, ...props }: TableRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  return (
    <tr className={twMerge('items-center group rounded cursor-default', className)} {...props}>
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
