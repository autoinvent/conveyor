import type { ComponentProps } from 'react';

import { STableRow } from '@/lib/components/ui/table';

import { Slots } from '@/Slots';

import { TableHeaderCell } from './TableHeaderCell';
import { useTableStore } from './useTableStore';

export interface TableHeaderRowProps extends ComponentProps<typeof STableRow> {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  ...htmlProps
}: TableHeaderRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  return (
    <STableRow {...htmlProps}>
      <Slots slotKeys={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <TableHeaderCell key={columnId} columnId={columnId} />;
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
