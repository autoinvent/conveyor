import type { ComponentProps, FC } from 'react';
import { Slot } from '@/base/slot/component/slot';
import { useTableRowStore } from '../hooks/use-table-row-store';
import { useTableStore } from '../hooks/use-table-store';
import { useShallow } from 'zustand/shallow';
import { cn } from '@/base/utils';
import type { Data } from '@/base/types';

export interface TableCellProps extends ComponentProps<'td'> {
  columnId: string;
  render?: FC<RenderProps>;
}

export interface RenderProps {
  rowIndex: number;
  rowData?: Data;
  columnId: string;
  columnData?: Data[string];
}

export const TableCell = ({
  columnId,
  render: Render,
  className,
  children,
  ...htmlProps
}: TableCellProps) => {
  const rowIndex = useTableRowStore((state) => state.rowIndex);
  const rowData = useTableStore(useShallow((state) => state.data?.[rowIndex]));

  const columnData = rowData?.[columnId];
  return (
    <Slot slotId={columnId}>
      {Render ? (
        <Render
          rowIndex={rowIndex}
          rowData={rowData}
          columnId={columnId}
          columnData={columnData}
        />
      ) : (
        <td className={cn('px-2 py-1', className)} {...htmlProps}>
          {children === undefined ? columnData : children}
        </td>
      )}
    </Slot>
  );
};
