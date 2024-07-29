import type { ComponentProps } from 'react';

import { STableRow } from '@/lib/components/ui/table';

import { Slots } from '@/Slots';

import { TableCell } from './TableCell';
import { useTableStore } from './useTableStore';

export interface TableRowProps extends ComponentProps<typeof STableRow> {
  prefilled?: boolean;
}

export const TableRow = ({ prefilled, children, ...props }: TableRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  return (
    <STableRow {...props}>
      <Slots slotKeys={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <TableCell key={columnId} columnId={columnId} />;
            })}
            {children}
          </>
        ) : (
          children
        )}
      </Slots>
    </STableRow>
  );
};
