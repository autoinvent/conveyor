import type { ComponentProps } from 'react';

import { Slots } from '@/Slots';
import { TableRow as STableRow } from '@/lib/components/ui/table';

import { TableHead } from './TableHead';
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
              return <TableHead key={columnId} columnId={columnId} />;
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
