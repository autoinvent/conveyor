import { HTMLAttributes } from 'react';

import { Slots } from '@/Slots';

import { TableCell } from './TableCell';
import { useTable } from './useTable';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  prefilled?: boolean;
}

export const TableRow = ({ prefilled, children, ...props }: TableRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  return (
    <tr {...props}>
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
