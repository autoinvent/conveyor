import type { ComponentProps } from 'react';

import { Slots } from '@/Slots';

import { TableHeaderCell } from './TableHeaderCell';
import { useTableStore } from './useTableStore';

export interface TableHeaderRowProps extends ComponentProps<'tr'> {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  className,
  ...htmlProps
}: TableHeaderRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  return (
    <tr className={className} {...htmlProps}>
      <Slots slotKeys={columnIds}>
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
