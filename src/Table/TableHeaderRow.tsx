import { HTMLAttributes } from 'react';

import { Slots } from '@/Slots';

import { TableHeaderCell } from './TableHeaderCell';
import { useTable } from './useTable';

export interface TableHeaderRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  ...props
}: TableHeaderRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  return (
    <tr {...props}>
      <Slots slotOrder={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId: string) => {
              return <TableHeaderCell key={columnId} columnId={columnId} />;
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
