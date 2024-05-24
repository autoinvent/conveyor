import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slots } from '@/Slots';

import { TableHeaderCell } from './TableHeaderCell';
import { useTable } from './useTable';

export interface TableHeaderRowProps extends ComponentProps<'tr'> {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  className,
  ...props
}: TableHeaderRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  return (
    <tr className={twMerge('rounded cursor-default', className)} {...props}>
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
