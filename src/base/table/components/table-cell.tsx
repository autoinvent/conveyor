import type { ComponentProps, FC } from 'react';

import { useShallow } from 'zustand/shallow';

import { Slot } from '@/base/slot/component/slot';
import type { Data } from '@/base/types';
import { cn } from '@/base/utils';

import { useTableRowStore } from '../hooks/use-table-row-store';
import { useTableStore } from '../hooks/use-table-store';

export interface TableCellProps<
  TColumn extends string,
  TData extends Data,
  TSelectedColumn extends string,
> extends Omit<ComponentProps<'td'>, 'children'> {
  column: TSelectedColumn & TColumn;
  render?: FC<TableCellRenderProps<NoInfer<TSelectedColumn>, TData>>;
}

export interface TableCellRenderProps<
  TColumn extends string,
  TData extends Data,
> {
  rowIndex: number;
  rowData: TData;
  column: TColumn;
  columnData: TData[TColumn];
}

export const TableCell =
  <TColumn extends string, TData extends Data>() =>
  <TSelectedColumn extends string>({
    column,
    render: Render,
    className,
    ...htmlProps
  }: TableCellProps<TColumn, TData, TSelectedColumn>) => {
    const rowIndex = useTableRowStore((state) => state.rowIndex);
    const rowData = useTableStore<TColumn, TData, TData>(
      useShallow((state) => state.data[rowIndex]),
    );

    const columnData = rowData[column];
    return (
      <Slot slotId={column}>
        <td className={cn('px-2 py-1', className)} {...htmlProps}>
          {Render ? (
            <Render
              rowIndex={rowIndex}
              rowData={rowData}
              column={column}
              columnData={columnData}
            />
          ) : (
            columnData
          )}
        </td>
      </Slot>
    );
  };
